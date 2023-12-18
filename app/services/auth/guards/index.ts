import { AuthLoginUser } from "@/auth/schemas/auth.schema";

export function PermissionAdminView(user: AuthLoginUser) {
    return user && [1].includes(user.role_id);
}
export function PermissionModifierAdminView(user: AuthLoginUser) {
    return user && [1, 2].includes(user.role_id);
}
