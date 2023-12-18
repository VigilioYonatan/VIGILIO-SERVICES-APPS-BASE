import { Controller, Get, Res } from "@decorators/express";
import { Response } from "express";
import { authDashboardPermissionAuthenticatedMiddleware } from "@/auth/middlewares/auth.middleware";

@Controller("/", [authDashboardPermissionAuthenticatedMiddleware])
export class AdminController {
    @Get("/*")
    index(@Res() res: Response) {
        return res.render("admin/index");
    }
}
