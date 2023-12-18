import passport from "passport";
import { Body, Controller, Post } from "@decorators/express";
import { NextFunction, Request, Response } from "express";
import { AuthApiService } from "../services/auth.api.service";
import { Validator } from "@vigilio/express-core/valibot";
import { AuthRegisterDto, authRegisterDto } from "../dtos/auth.register.dto";
import { Injectable } from "@decorators/di";

@Injectable()
@Controller("/auth")
export class AuthApiController {
    constructor(private readonly authApiService: AuthApiService) {}
    @Post("/login", [
        (req: Request, res: Response, next: NextFunction) => {
            passport.authenticate(
                "local",
                (err: Error, user: { id: string }, info: string) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return res.status(401).json(info);
                    }

                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err);
                        }
                        return res.status(201).json({
                            success: true,
                            page: "/admin",
                        });
                    });
                }
            )(req, res, next);
        },
    ])
    login() {}

    @Validator(authRegisterDto)
    @Post("/register")
    async register(@Body() authRegisterDto: AuthRegisterDto) {
        const result = await this.authApiService.register(authRegisterDto);
        return result;
    }
}
