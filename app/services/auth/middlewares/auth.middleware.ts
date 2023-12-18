import { type NextFunction, type Request, type Response } from "express";
import { AuthLoginUser } from "../schemas/auth.schema";

export async function authUserNoAuthenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.user) {
        return res.redirect("/");
    }
    next();
}
export async function authUserAuthenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return res.redirect("/");
    }
    next();
}
export async function authDashboardPermissionAuthenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return res.redirect("/auth/login");
    }
    const user = req.user as AuthLoginUser;
    if ([3].includes(user.role_id)) {
        return res.redirect("/");
    }
    next();
}
