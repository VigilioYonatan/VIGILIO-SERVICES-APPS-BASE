import { AdminController } from "@/admin/controllers/admin.controller";
import { Type } from "@decorators/di/lib/src/types";

export const adminRouters: Type[] = [AdminController];
