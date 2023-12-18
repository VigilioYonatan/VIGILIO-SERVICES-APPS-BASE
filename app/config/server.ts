import express from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
import compression from "compression";
import cookieParser from "cookie-parser";
import enviroments from "~/config/enviroments.config";
import socket from "socket.io";
import http from "node:http";
import { ERROR_MIDDLEWARE, attachControllers } from "@decorators/express";
import {
    ServerMiddleware,
    IO_MIDDLEWARE,
    attachControllers as attachSocketControllers,
} from "@decorators/socket";
import { connectDB } from "~/config/db.config";
import { ServerErrorMiddleware } from "@vigilio/express-core/handler";
import { Container } from "@decorators/di";
import { formatMoney, logger } from "@vigilio/express-core/helpers";
import { client } from "@vigilio/express-core/client";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { apiRouters } from "~/routers/api.router";
import { webRouters } from "~/routers/web.router";
import { authRouters } from "~/routers/auth.router";
import { middlewareRoute } from "~/lib/middleware-route";
import { adminRouters } from "~/routers/admin.router";
import { holiday, numberPhoneFormated } from "~/lib/helpers";
import { googleStrategy, localStrategy } from "@/auth/strategies";
import { Users } from "@/users/entities/users.entity";
import { Roles } from "@/roles/entities/roles.entity";
import { socketsRouters } from "~/routers/sockets.router";
import { printFileWithDimension } from "@/uploads/libs/helpers";
import { Information } from "@/information/entities/information.entity";
import {
    PermissionAdminView,
    PermissionModifierAdminView,
} from "@/auth/guards";
import { AuthLoginUser } from "@/auth/schemas/auth.schema";
import { botNormalDB } from "~/lib/bot-normal-db";
import morgan from "morgan";

export class Server {
    public readonly app: express.Application = express();

    constructor() {
        this.middlewares();
        this.auth();
        this.routes();
        // this.bot();
    }

    auth() {
        // https://www.passportjs.org/concepts/authentication/sessions/
        this.app.use(
            session({
                secret: enviroments.SECRET_SESSION_KEY,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: enviroments.NODE_ENV === "production", //true in production para que solo se pueda loguear cando tiene ssl web
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000 * 30, //30 dias. pasa los dias se borra la cookie y obligatorio a volverse a loguear
                },
            })
        ); // inicializar sessión
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        passport.use(googleStrategy); // authenticar con google
        passport.use(localStrategy); // authenticar local con cookie

        // middleware que envia usuario si se autenthico correctamente
        passport.serializeUser((user, done) => {
            return done(null, user);
        });

        // middleware que comprueba si si se está autenthicando
        // correctamente y enviamos informacion user a middleware
        passport.deserializeUser(async (user: { id: number }, done) => {
            const usuario = await Users.findByPk(user.id, {
                attributes: { exclude: ["password"] },
                include: [{ model: Roles, attributes: ["name"] }],
            });
            if (!usuario) {
                return done({ message: "error authenticated" });
            }
            return done(null, usuario);
        });

        // middleware antes de entrar en las webs
        this.app.use(async (req, res, next) => {
            // rellenar los datos empresa para poder empezar la web
            const information = await Information.findByPk(1, {
                attributes: { exclude: ["politica"] },
            });
            if (!information && !req.path.includes("/api")) {
                return res.render("initial");
            }
            res.locals.$information = information;

            const user = req.user as AuthLoginUser;
            if (
                !information?.enabled &&
                !user &&
                !req.path.includes("/auth") &&
                !req.path.includes("/api")
            ) {
                return res.render("development");
            }
            if (
                !information?.enabled &&
                user &&
                !req.path.includes("/auth") &&
                !req.path.includes("/api")
            ) {
                if (![1, 2, 3].includes(user.role_id)) {
                    return res.render("development");
                }
            }

            if (user) {
                // variables y methodos globales de usuario
                //! cuando ya se inició sesión creamos variable user y con eso obtener informacion de user en las vistas. MUY UTIL
                res.locals.$user = user;

                res.locals.PermissionAdminView = () =>
                    PermissionAdminView(user);
                res.locals.PermissionModifierAdminView = () =>
                    PermissionModifierAdminView(user);
            }
            next();
        });
    }

    middlewares() {
        // comprimir paginas webs para mejor rendimiento - NO TOCAR si no es necesario
        this.app.use(
            compression({
                threshold: 10000,
                filter: (req, res) => {
                    if (req.headers["x-no-compression"]) {
                        return false;
                    }
                    return compression.filter(req, res);
                },
            })
        );
        // habilitar cookies
        this.app.use(cookieParser());
        // habilitar para consumir json
        this.app.use(express.json());
        // habilitar carpeta public
        this.app.use(
            express.static(path.resolve(__dirname, "..", "..", "public"))
        );
        // habilitar para consumir vistas
        this.app.set("view engine", "ejs");
        this.app.set(
            "views",
            path.resolve(__dirname, "..", "..", "resources", "views")
        );
        // vite js configuración
        this.app.use(client());

        // metodos globales
        this.app.use(async (req, res, next) => {
            res.locals.holiday = holiday;
            res.locals.printFileWithDimension = printFileWithDimension;
            res.locals.numberPhoneFormated = numberPhoneFormated;
            const money: "USD" | "PEN" = req.cookies.money;
            let converted = 1;
            if (money === "USD") {
                converted = 0.26774035;
            }
            res.locals.formatMoney = (value: number) => {
                const price = value * converted;
                return formatMoney(price, money);
            };

            next();
        });
        // conectar base de datos
        // connectDB();
    }

    routes() {
        // cuando recargues la pagina en consola se muestra la url de la pagína
        this.app.use(morgan("dev"));
        // rutas
        const apiRouter = express.Router();
        const webRouter = express.Router();
        const authRouter = express.Router();
        const adminRouter = express.Router();
        attachControllers(apiRouter, apiRouters);
        attachControllers(webRouter, webRouters);
        attachControllers(authRouter, authRouters);
        attachControllers(adminRouter, adminRouters);
        Container.provide([
            { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
        ]);

        this.app.use("/", webRouter);
        this.app.use("/auth", authRouter);
        this.app.use("/api", apiRouter);
        this.app.use("/admin", adminRouter);
        this.app.use(middlewareRoute);
    }

    sockets() {
        // socket io
        const serve = new http.Server(this.app);
        const io = new socket.Server(serve);
        Container.provide([
            { provide: IO_MIDDLEWARE, useClass: GlobalMiddleware },
        ]);
        attachSocketControllers(io, socketsRouters);
        return serve;
    }

    async bot() {
        // https://wwebjs.dev/ bot en whatsapp
        const client = new Client({
            authStrategy: new LocalAuth(),
        });

        // para activar qr
        client.on("qr", (qr) => {
            qrcode.generate(qr, { small: true });
        });

        // para verificar si está listo el bot
        client.on("ready", async () => {
            // biome-ignore lint/suspicious/noConsoleLog: <explanation>
            console.log("Client is ready!");
            // const chats = await client.getChats(); // obtener todos los chats que tienes
            // console.log(chats);
        });

        // cuando el cliente nos envia mensaje
        client.on("message", async (message) => {
            //  bot hecho con data no dinamica - en lib bot-chatpt está con chatpt ia
            await botNormalDB(client, message);
        });

        client.initialize();
    }

    listen() {
        const server = this.sockets().listen(enviroments.PORT, () => {
            logger.primary(`Run server in port ${enviroments.PORT}`);
        });

        return server;
    }
}
class GlobalMiddleware implements ServerMiddleware {
    public use(
        _io: socket.Server | socket.Namespace,
        _socket: socket.Socket,
        next: () => void
    ) {
        // biome-ignore lint/suspicious/noConsoleLog: <explanation>
        console.log("conectado sockets correctamente");
        next();
    }
}
