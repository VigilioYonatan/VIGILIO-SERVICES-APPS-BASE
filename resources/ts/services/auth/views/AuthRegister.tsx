import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import LogoImage from "~/components/LogoImage";
import Form from "~/components/form";
import { AuthRegisterDto, authRegisterDto } from "../dtos/auth.register.dto";
import { AuthType } from "./Auth";
import { useEffect } from "preact/hooks";
import { authRegisterApi } from "../apis/auth.register.api";
import { sweetModal } from "@vigilio/sweet";

interface AuthRegisterProps {
    onChangeInputAuth: (value: AuthType) => void;
}
function AuthRegister({ onChangeInputAuth }: AuthRegisterProps) {
    const authLoginForm = useForm<AuthRegisterDto>({
        resolver: valibotResolver(authRegisterDto),
        mode: "all",
    });
    const mutateRegister = authRegisterApi();
    const { watch, setError } = authLoginForm;

    const password = watch("password");
    const repeat_password = watch("repeat_password");

    useEffect(() => {
        if (repeat_password?.length > 0 && password !== repeat_password) {
            setError("repeat_password", {
                message: "Contraseña no son similares",
            });
        }
    }, [password, repeat_password]);

    function onAuthLogin(data: AuthRegisterDto) {
        mutateRegister.mutate(data, {
            onSuccess(_data) {
                authLoginForm.reset();
            },
            onError(error) {
                if (error?.body) {
                    authLoginForm.setError(
                        error.body as keyof AuthRegisterDto,
                        {
                            message: error.message,
                        }
                    );
                    authLoginForm.resetField(
                        error.body as keyof AuthRegisterDto,
                        {
                            keepError: true,
                        }
                    );

                    return;
                }
                sweetModal({
                    icon: "danger",
                    title: "Error en el servidor",
                    text: `Comunicarse con el desarrollador ${error}`,
                });
            },
        });
    }
    return (
        <div class="text-start p-4">
            <div class="flex justify-center items-center flex-col gap-2 mb-2">
                <LogoImage width="50" height="50" />
                <h3 class="text-2xl font-bold dark:text-secondary-light text-secondary-dark">
                    Crear cuenta
                </h3>
                <p class="text-terciary text-sm">
                    Estás a punto de unirte a nosotros
                </p>
            </div>
            <Form onSubmit={onAuthLogin} {...authLoginForm}>
                <Form.control.web
                    ico={<i class="fas fa-user text-sm" />}
                    name={"name" as keyof AuthRegisterDto}
                    title="Nombre"
                />
                <Form.control.web
                    ico={<i class="fas fa-at text-sm" />}
                    name={"email" as keyof AuthRegisterDto}
                    title="Correo electrónico"
                    autoComplete="email"
                />
                <div class="flex flex-col gap-2 sm:flex-row">
                    <Form.control.web
                        name={"password" as keyof AuthRegisterDto}
                        title="Contraseña"
                        type="password"
                        ico={<i class="fas fa-lock text-sm" />}
                        autoComplete="current-password"
                    />
                    <Form.control.web
                        name={"repeat_password" as keyof AuthRegisterDto}
                        title="Confirmar contraseña"
                        type="password"
                        ico={<i class="fas fa-lock text-sm" />}
                        autoComplete="current-password"
                    />
                </div>

                <Form.button.submit
                    title="Iniciar sesión"
                    className="w-full justify-center py-3"
                    ico={null}
                    isLoading={false}
                />
            </Form>
            <div class="mt-6 flex justify-center">
                <button
                    type="button"
                    class="text-primary text-xs hover:underline"
                    onClick={() => onChangeInputAuth("login")}
                >
                    Ya tengo una cuenta
                </button>
            </div>
        </div>
    );
}

export default AuthRegister;
