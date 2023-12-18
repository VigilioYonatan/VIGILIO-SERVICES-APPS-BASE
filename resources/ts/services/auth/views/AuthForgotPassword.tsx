import LogoImage from "~/components/LogoImage";
import Form from "~/components/form";
import { useForm } from "react-hook-form";
import { type AuthType } from "./Auth";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { usersSchema } from "@/users/schemas/users.schema";
import { pick } from "valibot";

interface AuthForgotPasswordProps {
    onChangeInputAuth: (value: AuthType) => void;
}
function AuthForgotPassword({ onChangeInputAuth }: AuthForgotPasswordProps) {
    const authForgotPasswordForm = useForm<{ email: string }>({
        mode: "all",
        resolver: valibotResolver(pick(usersSchema, ["email"])),
    });

    function onAuthLogin(data: { email: string }) {
        console.log(data);
    }
    return (
        <div class="text-start p-4">
            <div class="flex justify-center items-center flex-col gap-2 mb-2">
                <LogoImage width="50" height="50" />
                <h3 class="text-2xl font-bold dark:text-secondary-light text-secondary-dark">
                    Me olvidé mi contraseña
                </h3>
            </div>
            <Form onSubmit={onAuthLogin} {...authForgotPasswordForm}>
                <Form.control
                    ico={<i class="fas fa-at text-sm" />}
                    name={"email"}
                    title="correo electrónico"
                />
                <Form.button.submit
                    title="Enviar"
                    className="w-full justify-center py-3"
                    ico={null}
                    isLoading={false}
                />
            </Form>
            <div class="mt-6 flex justify-center">
                <button
                    type="button"
                    class="text-primary text-base hover:underline"
                    onClick={() => onChangeInputAuth("login")}
                >
                    Atrás
                </button>
            </div>
        </div>
    );
}

export default AuthForgotPassword;
