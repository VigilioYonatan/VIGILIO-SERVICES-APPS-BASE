import { AuthController } from "@/auth/controllers/auth.controller";
import { Type } from "@decorators/di/lib/src/types";

export const authRouters: Type[] = [AuthController];
