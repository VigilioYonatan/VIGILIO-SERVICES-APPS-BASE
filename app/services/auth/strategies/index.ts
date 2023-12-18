import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { compareSync } from "bcryptjs";
import { Users } from "@/users/entities/users.entity";
import { type UsersEntitySchema } from "@/users/schemas/users.schema";
import { generateId } from "@vigilio/express-core/helpers";
// https://www.passportjs.org/packages/passport-google-oauth20/
export const googleStrategy = new GoogleStrategy(
    {
        clientID: "tuclientiddegoogle", //https://console.cloud.google.com/apis/credentials?pli=1
        clientSecret: "tucsecretdegoogle",
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
        const { emails, photos, name, id } = profile;
        let user = await Users.findOne({
            where: {
                google: id,
            },
        });

        if (!user) {
            const newUser = new Users({
                name: name?.givenName,
                password: generateId(),
                google: id,
                foto: photos
                    ? [{ file: photos[0].value, dimension: 300 }]
                    : null,
                email: emails?.[0].value,
                slug: name?.givenName,
                role_id: 3, // será cliente
            } as UsersEntitySchema);
            user = await newUser.save();
        }
        if (!user) {
            return done(null, false, {
                message: "no se pudo loguear correctamente",
            });
        }
        // esto guarda en cookie id de usuario
        return done(null, { id: user.id });
    }
);

export const localStrategy = new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        const user = await Users.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            // por buena practica y seguridad insertar error similar para que el cliente no sepa cual es el error el correo o contraseña
            return done(null, false, {
                // error que se lleva al cliente
                message: "Correo electrónico o contraseña incorrecta",
            });
        }
        const validPassword = compareSync(password, user.password);
        if (!validPassword) {
            return done(null, false, {
                message: "Correo electrónico o contraseña incorrecta",
            });
        }
        // esto guarda en cookie id de usuario
        return done(null, { id: user.id });
    }
);
