import { signal } from "@preact/signals";
import { AuthLogin } from "../schemas/auth.schema";

const auth = signal<AuthLogin>({} as AuthLogin);
function useAuthstore() {
    function onLogin(user: AuthLogin) {
        auth.value = user;
    }
    return {
        state: auth.value,
        onLogin,
    };
}
export function authPermissionModifierGuard() {
    const { state } = useAuthstore();
    if (state.id) {
        // admin - modificador
        return [1, 2].includes(state.role.id);
    }
    return false;
}
export function authPermissionAdmin() {
    const { state } = useAuthstore();
    if (state.id) {
        // admin - modificador
        return [1].includes(state.role.id);
    }
    return false;
}

export default useAuthstore;
