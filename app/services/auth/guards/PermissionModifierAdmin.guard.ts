import { attachMiddleware } from "@decorators/express";
import { type NextFunction, type Request, type Response } from "express";
import { AuthLoginUser } from "@/auth/schemas/auth.schema";

export function PermissionModifierAdmin() {
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
                // only admin and modifiers
                if (![1, 2].includes(user.role_id)) {
                    return res.status(403).json({
                        success: false,
                        message:
                            "No está permitido realizar esta acción, solo los admin y modificadores",
                    });
                }
                next();
            }
        );
    };
}
