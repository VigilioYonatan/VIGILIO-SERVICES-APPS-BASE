import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { logoutUrl } from "@/auth/lib";
import { ImagesSchema } from "~/lib/upload";
import { linkVigilio } from "~/config/settings";
import enviroments from "~/config";
import NavLink from "./NavLink";
import useAuthstore, { authPermissionAdmin } from "@/auth/stores/auth.store";
import AdminDropdown from "@/admin/components/AdminDropdown";
import WebTheme from "@/web/WebTheme";
import { printFileUser } from "@/users/lib/helpers";
import useInformationstore from "@/information/stores/information.store";
import { printLogoInformation } from "@/information/lib/helpers";
import { useQuery } from "@vigilio/preact-fetching";

interface AdminLayoutProps {
    children: JSX.Element | JSX.Element[];
}
function AdminLayout({ children }: AdminLayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const authStore = useAuthstore();
    const informationStore = useInformationstore();
    const vigilioQuery = useQuery("/", async (_url) => {
        const response = await fetch(
            `${enviroments.VIGILIO_WEB}/api/webs/${enviroments.VIGILIO_TOKEN}`
        );
        const result = await response.json();
        return result;
    });
    let VigilioMessage = null;
    if (vigilioQuery.isSuccess) {
        VigilioMessage = (
            <div
                className="text-xl"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{
                    __html: vigilioQuery.data.web.message,
                }}
            />
        );
    }
    return (
        <div>
            {VigilioMessage}
            <div class="flex relative   h-screen overflow-hidden">
                <div
                    class={`${
                        isOpen ? "block" : "hidden sm:block"
                    }  w-[60px] md:w-[320px] relative dark:bg-admin-paper-dark bg-background-light shadow-sm  border border-gray-200 dark:border-gray-700`}
                >
                    <div class="p-2 flex justify-center items-center h-[100px]">
                        <a
                            href={enviroments.VITE_URL}
                            class="w-[80px] h-[80px] flex justify-center items-center"
                        >
                            {informationStore.state.logo ? (
                                <img
                                    class="w-full h-full object-contain"
                                    width={80}
                                    height={80}
                                    src={
                                        printLogoInformation(
                                            informationStore.state.logo,
                                            100
                                        )[0]
                                    }
                                    alt="logo"
                                />
                            ) : (
                                <span class="dark:text-white text-4xl font-bold">
                                    {informationStore.state.name[0]}
                                </span>
                            )}
                        </a>
                        {/* logo */}
                    </div>
                    <div class="h-screen overflow-auto mt-3 px-2 flex flex-col gap-2 ">
                        <NavLink
                            to=""
                            title="Dashboard"
                            Icon={<i class="fas fa-tachometer-alt" />}
                        />
                        <NavLink
                            to="/users"
                            title="Usuarios"
                            Icon={<i class="fas fa-users" />}
                        />
                        <NavLink
                            to="/roles"
                            title="Roles"
                            Icon={<i class="fas fa-user-tag" />}
                        />
                        <NavLink
                            to="/categories"
                            title="Categorias"
                            Icon={<i class="fa-solid fa-layer-group" />}
                        />
                        <NavLink
                            to="/products"
                            title="Productos"
                            Icon={<i class="fas fa-hamburger" />}
                        />
                        <NavLink
                            to="/reviews"
                            title="Reviews"
                            Icon={<i class="fas fa-comment-dots" />}
                        />
                        {authPermissionAdmin() ? (
                            <NavLink
                                to="/settings"
                                title="Configuración"
                                Icon={<i class="fas fa-tools" />}
                            />
                        ) : null}

                        <NavLink
                            to="/plus"
                            title="Plus - Mejora tu web"
                            Icon={<i class="fa-solid fa-star" />}
                            uris={[
                                {
                                    title: "Auntenticación",
                                    to: "/settings/auth",
                                },
                            ]}
                        />
                    </div>
                    <div class="flex flex-col items-center gap-2 absolute bottom-10 right-0 left-0 mx-2">
                        <a
                            href={logoutUrl()}
                            class="text-white font-bold bg-red-600 w-full py-3 rounded-md text-center flex items-center justify-center gap-2"
                        >
                            <i class="fas fa-sign-out-alt" />
                            <span class="hidden lg:block">Salir</span>
                        </a>
                        <a
                            href={linkVigilio()}
                            target="_blank"
                            rel="noreferrer"
                            class="text-[10px] mt-2 opacity-70 text-xs text-terciary text-center"
                        >
                            Powered by{" "}
                            <b class="text-primary dark:text-white">Vigilio</b>
                        </a>
                    </div>
                </div>
                <div class="w-full overflow-auto ">
                    <header class="relative z-[999] flex w-full items-center justify-between py-4 shadow-sm  border-b border-gray-200 dark:border-gray-700 px-4 dark:bg-admin-paper-dark bg-background-light">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            class="bg-secondary px-4 rounded-full w-[40px] h-[40px] justify-center items-center  sm:hidden flex"
                            aria-label="button to change aside"
                        >
                            {isOpen ? (
                                <i class="fas fa-times text-white text-xl" />
                            ) : (
                                <i class="fas fa-bars text-white text-xl" />
                            )}
                        </button>
                        <h1 class="text-xl font-bold uppercase dark:text-secondary-light text-secondary-dark">
                            {informationStore.state.name}
                        </h1>
                        <div class="flex gap-4 items-center">
                            <WebTheme />
                            <AdminDropdown
                                triggerChildren={({ trigger, onOpen }) => (
                                    <button
                                        ref={trigger}
                                        type="button"
                                        aria-label="button to open user dropdown"
                                        class="relative dark:text-secondary-light text-secondary-dark"
                                        onClick={onOpen}
                                    >
                                        <i class="fa-solid fa-bell" />
                                        <span class="absolute left-[4px] top-[-5px] text-xs bg-danger px-[.3rem] font-bold rounded-full text-white">
                                            +9
                                        </span>
                                    </button>
                                )}
                            >
                                <div class="flex flex-col justify-center items-center">
                                    <p class="text-sm dark:text-secondary-light text-secondary-dark">
                                        Hola{" "}
                                        <span class="font-bold">
                                            {authStore.state.name}
                                        </span>
                                    </p>
                                </div>
                            </AdminDropdown>
                            <AdminDropdown
                                triggerChildren={({ trigger, onOpen }) => (
                                    <button
                                        ref={trigger}
                                        type="button"
                                        aria-label="button to open user dropdown"
                                        class="flex gap-4  p-1 active:bg-primary overflow-hidden rounded-full"
                                        onClick={onOpen}
                                    >
                                        <img
                                            class="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full"
                                            width={50}
                                            height={50}
                                            src={
                                                printFileUser(
                                                    authStore.state
                                                        .foto as ImagesSchema[],
                                                    300
                                                )[0]
                                            }
                                            alt={authStore.state.name}
                                        />
                                    </button>
                                )}
                            >
                                <div class="flex flex-col justify-center items-center">
                                    <p class="text-sm dark:text-secondary-light text-secondary-dark">
                                        Hola{" "}
                                        <span class="font-bold">
                                            {authStore.state.name}
                                        </span>
                                    </p>
                                </div>
                            </AdminDropdown>
                        </div>
                    </header>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
