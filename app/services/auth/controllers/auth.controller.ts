import { Injectable } from "@decorators/di";
import { Controller, Get, Req, Res } from "@decorators/express";
import { NextFunction, type Request, type Response } from "express";
import passport from "passport";
import { AuthLoginUser } from "../schemas/auth.schema";
import { PermissionModifierAdminView } from "@/auth/guards";
import {
    authUserAuthenticatedMiddleware,
    authUserNoAuthenticatedMiddleware,
} from "../middlewares/auth.middleware";

@Injectable()
@Controller("/")
export class AuthController {
    @Get("/login", [authUserNoAuthenticatedMiddleware])
    async login(@Res() res: Response) {
        return res.render("auth/login");
    }

    @Get("/google/callback", [
        passport.authenticate("google", {
            failureRedirect: "/auth/login",
        }),
    ])
    async googleCB(@Req() req: Request, @Res() res: Response) {
        const user = req.user as AuthLoginUser;

        if (PermissionModifierAdminView(user)) {
            return res.redirect("/admin");
        }
        return res.redirect("/");
    }

    @Get("/register", [authUserNoAuthenticatedMiddleware])
    async register(@Res() res: Response) {
        return res.render("auth/register");
    }

    @Get("/profile", [authUserAuthenticatedMiddleware])
    async profile(@Res() res: Response, @Req() req: Request) {
        return res.render("auth/profile", { user: req.user });
    }

    @Get("/logout", [authUserAuthenticatedMiddleware])
    async logout(
        @Req() req: Request,
        @Res() res: Response,
        next: NextFunction
    ) {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
}
