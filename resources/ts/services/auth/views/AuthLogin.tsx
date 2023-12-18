import LogoImage from "~/components/LogoImage";
import Form from "~/components/form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type AuthLoginDto, authLoginDto } from "../dtos/auth.login.dto";
import { useState } from "preact/hooks";
import { type AuthType } from "./Auth";
import { googleUrl } from "../lib";
import { authLoginApi } from "../apis/auth.login.api";
import { sweetModal } from "@vigilio/sweet";
import enviroments from "~/config";

interface AuthLoginProps {
    onChangeInputAuth: (value: AuthType) => void;
}
function AuthLogin({ onChangeInputAuth }: AuthLoginProps) {
    const [rememberPassword, _setRememberPassword] = useState<string>(
        localStorage.getItem("rememberPassword") || ""
    );

    const authLoginApiMutation = authLoginApi();

    const authLoginForm = useForm<AuthLoginDto>({
        resolver: valibotResolver(authLoginDto),
        mode: "all",
    });
    function onAuthLogin(data: AuthLoginDto) {
        authLoginApiMutation.mutate(data, {
            onSuccess() {
                sweetModal({ title: "Logueado correctamente" }).then(() => {
                    window.location.href = `${enviroments.VITE_URL}/admin`;
                });
            },
        });
    }
    return (
        <div class="text-start p-4">
            <div class="flex justify-center items-center flex-col gap-2 mb-2">
                <LogoImage width="50" height="50" />
                <h3 class="text-2xl font-bold dark:text-secondary-light text-secondary-dark">
                    Inicio de sesión
                </h3>
                <p class="text-terciary text-sm">
                    Inicia sesión para acceder a tu cuenta
                </p>
            </div>
            <Form onSubmit={onAuthLogin} {...authLoginForm}>
                {authLoginApiMutation.isError ? (
                    <p class="text-white bg-danger w-full text-xs py-2 px-3 ">
                        <i class="fa-solid fa-circle-exclamation mr-1" />
                        {authLoginApiMutation.error?.message}
                    </p>
                ) : (
                    <></>
                )}
                <Form.control.web
                    ico={<i class="fas fa-at text-sm" />}
                    name={"email" as keyof AuthLoginDto}
                    title="Correo Electrónico"
                    placeholder="correo@gmail.com"
                    autoComplete="email"
                />
                <Form.control.web
                    name={"password" as keyof AuthLoginDto}
                    title="Contraseña"
                    type="password"
                    placeholder="●●●●●●●●"
                    ico={<i class="fas fa-lock" />}
                    autoComplete="current-password"
                    options={{ value: rememberPassword }}
                />
                <div className="flex items-center gap-2 mb-6">
                    <input
                        id="rememberPassword"
                        type="checkbox"
                        {...authLoginForm.register("rememberPassword", {
                            value: false,
                        })}
                    />
                    <label
                        htmlFor="rememberPassword"
                        class="text-xs dark:text-secondary-light text-secondary-dark"
                    >
                        Recordar contraseña
                    </label>
                </div>
                <Form.button.submit
                    title="Iniciar sesión"
                    className="w-full justify-center py-3"
                    ico={null}
                    isLoading={false}
                />
                <div class="mt-6 flex flex-col sm:flex-row justify-between gap-2 flex-wrap">
                    <button
                        type="button"
                        class="text-primary text-xs hover:underline"
                        onClick={() => onChangeInputAuth("forgot-password")}
                    >
                        Me olvide mi contraseña?
                    </button>
                    <button
                        type="button"
                        class="text-primary text-xs hover:underline"
                        onClick={() => onChangeInputAuth("register")}
                    >
                        No tengo una cuenta?
                    </button>
                </div>
            </Form>
            <div class="flex justify-center  flex-col gap-2 items-center w-full">
                <span class=" dark:text-secondary-light text-secondary-dark my-4">
                    Ó
                </span>
                <a
                    href={googleUrl()}
                    class="flex gap-2 items-center shadow px-4 py-3 border w-full rounded-sm justify-center bg-background-light text-sm lg:text-base"
                >
                    <img
                        width={20}
                        height={20}
                        alt="logo google"
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                    />
                    Iniciar sesión con Google
                </a>
            </div>
        </div>
    );
}

export default AuthLogin;
