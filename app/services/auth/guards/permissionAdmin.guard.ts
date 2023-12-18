import { attachMiddleware } from "@decorators/express";
import { NextFunction } from "@decorators/socket/lib/src/middleware";
import { Request, Response } from "express";
import { AuthLoginUser } from "@/auth/schemas/auth.schema";

// asi puedes crear decoradores
export function PermissionAdmin() {
    return (
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        target: any,
        propertyKey: string,
        _descriptor: PropertyDescriptor
    ) => {
        attachMiddleware(
            target,
            propertyKey,
            (req: Request, res: Response, next: NextFunction) => {
                const user = req.user as AuthLoginUser;
                if (!user) {
                    return res.status(403).json({
                        success: false,
                        message: "No está permitido realizar esta acción",
                    });
                }
                // only admin
                if (![1].includes(user.role_id)) {
                    return res.status(403).json({
                        success: false,
                        message:
                            "No está permitido realizar esta acción, solo los admin",
                    });
                }
                next();
            }
        );
    };
}
