import AuthForgotPassword from "./AuthForgotPassword";
import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";
import { useSignal } from "@preact/signals";

export type AuthType = "login" | "register" | "forgot-password";
function Auth() {
    const authType = useSignal<AuthType>("login");

    function onChangeInputAuth(value: AuthType) {
        authType.value = value;
    }
    if (authType.value === "login") {
        return <AuthLogin onChangeInputAuth={onChangeInputAuth} />;
    }
    if (authType.value === "register") {
        return <AuthRegister onChangeInputAuth={onChangeInputAuth} />;
    }
    if (authType.value === "forgot-password") {
        return <AuthForgotPassword onChangeInputAuth={onChangeInputAuth} />;
    }
    return null;
}

export default Auth;
