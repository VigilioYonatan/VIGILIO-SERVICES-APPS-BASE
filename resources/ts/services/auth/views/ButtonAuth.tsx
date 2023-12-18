import { sweetModal } from "@vigilio/sweet";
import { reactComponent } from "~/lib/preact";
import useMediaQuery, { useMediaQueryNoReactive } from "~/hooks/useMediaQuery";
import { lazy } from "preact/compat";
import useAuthstore, {
    authPermissionModifierGuard,
} from "../stores/auth.store";
import { printFileUser } from "@/users/lib/helpers";
import WebDropdown from "~/components/dropdown/WebDropdown";
import enviroments from "~/config";
// lazy
const Auth = lazy(() => import("./Auth"));

function ButtonAuth() {
    const { state } = useAuthstore();
    function openButton() {
        sweetModal({
            html: reactComponent(<Auth />),
            showCloseButton: true,
            sweetWidth: "600px",
            position: useMediaQueryNoReactive("(min-width:700px)")
                ? "center"
                : "start",
        });
    }

    return (
        <div class="flex-1 flex justify-center items-center text-white flex-col gap-1 lg:order-2">
            {state.id ? (
                <WebDropdown
                    className={`py-2 px-0 top-[30px] ${
                        useMediaQuery("(min-width: 1025px)") ? "flex" : "hidden"
                    } `}
                    triggerChildren={({ trigger }) => (
                        <a
                            href={`${enviroments.VITE_URL}/auth/profile`}
                            class="flex justify-center flex-col items-center gap-1"
                            ref={trigger}
                        >
                            <img
                                width={100}
                                height={100}
                                src={printFileUser(state.foto, 300)[0]}
                                alt={state.name}
                                class="rounded-full max-w-[35px] min-w-[35px] h-[35px] object-cover"
                            />
                            <span class="text-[10px] font-semibold uppercase text-primary lg:hidden">
                                {state.name}
                            </span>
                        </a>
                    )}
                >
                    <div class="flex flex-col gap-2   w-full  text-black dark:text-secondary-light">
                        <span class="block mx-auto font-bold">
                            Hola{" "}
                            <b class="text-primary font-bold">{state.name}</b>
                        </span>
                        <a
                            href={`${enviroments.VITE_URL}/auth/profile`}
                            class="flex gap-2 items-center  py-1 px-2 delay-custom-1 dark:hover:bg-paper-dark hover:bg-paper-light"
                        >
                            <i class="fas fa-user" />
                            Mi perfil
                        </a>
                        <a
                            href={`${enviroments.VITE_URL}/auth/profile`}
                            class="flex gap-2 items-center  py-1 px-2 delay-custom-1 dark:hover:bg-paper-dark hover:bg-paper-light"
                        >
                            <i class="fas fa-box" />
                            Mis Pedidos
                        </a>
                        {authPermissionModifierGuard() ? (
                            <a
                                href={`${enviroments.VITE_URL}/admin`}
                                class="flex gap-2 items-center  py-1 px-2 delay-custom-1 dark:hover:bg-paper-dark hover:bg-paper-light"
                            >
                                <i class="fas fa-tachometer-alt" />
                                Ir a dashboard
                            </a>
                        ) : null}

                        <a
                            href={`${enviroments.VITE_URL}/auth/logout`}
                            class="flex gap-2 items-center bg-danger py-1 px-2 text-white"
                        >
                            <i class="fa-solid fa-right-from-bracket" />
                            Salir
                        </a>
                    </div>
                </WebDropdown>
            ) : (
                <button
                    type="button"
                    aria-label="button to Open auth"
                    class="flex justify-center w-full items-center text-white  flex-col gap-1 relative"
                    onClick={openButton}
                >
                    <i class="fa-solid fa-circle-user text-2xl" />
                    <span class="text-[10px] lg:hidden font-semibold uppercase">
                        clientes
                    </span>
                </button>
            )}
        </div>
    );
}

export default ButtonAuth;
