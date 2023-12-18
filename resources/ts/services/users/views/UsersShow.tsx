import { formatDate } from "@vigilio/express-core/helpers";
import { usersShowApi } from "../apis/users.show.api";
import { sweetModal } from "@vigilio/sweet";
import { usersDestroyApi } from "../apis/users.destroy.api";
import {
    GoogleMap,
    GoogleMapProps,
    Marker,
    MarkerProps,
    useJsApiLoader,
} from "@react-google-maps/api";
import { JSX } from "preact/jsx-runtime";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import {
    icoRole,
    icoRoleColor,
    numberPhoneFormated,
    printFileUser,
} from "../lib/helpers";
import useAuthstore, {
    authPermissionModifierGuard,
} from "@/auth/stores/auth.store";
import Loading from "@/admin/components/Loading";
import View404 from "@/admin/views/404";

const GoogleMapPreact = GoogleMap as unknown as (
    props: GoogleMapProps
) => JSX.Element;
const MarkerMarkPreact = Marker as unknown as (
    props: MarkerProps
) => JSX.Element;
interface UsersShowProps {
    params: { slug?: string | number };
}
function UsersShow({ params: { slug } }: UsersShowProps) {
    const { mutate } = usersDestroyApi();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDy3G0jNTJoDTCVDV7Cjm30javbCbr2lsk",
    });
    const { data, isSuccess, isLoading, isError } = usersShowApi(
        slug as string
    );
    let component = null;

    if (isLoading) {
        component = <Loading />;
    }
    if (isError) {
        component = <View404 message={`No se encontró un usuario: ${slug}`} />;
    }
    if (isSuccess && data) {
        component = (
            <div class="p-4">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "usuarios", uri: "/users" }]}
                        current={data.user.name}
                    />
                </div>
                <div class="flex gap-4 flex-col text-start">
                    <img
                        src={printFileUser(data.user.foto, 300)[0]}
                        class="rounded-md mb-5 w-[150px] h-[150px] object-cover  mx-auto"
                        width="150"
                        height="150"
                        alt={data.user.name}
                    />
                    <div class="flex gap-4 flex-wrap justify-center  font-semibold">
                        <div class="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    ID:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.id}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3  p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Nombre:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.name}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3  p-2 bg-paper-light dark:bg-admin-terciary rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Apelido Paterno:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.father_lastname ||
                                        "No se ingresó"}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3  p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Apelido Materno:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.mother_lastname ||
                                        "No se ingresó"}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md ">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Dni:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide line-clamp-2">
                                    {data.user.dni || "no se ingresó"}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3   p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Correo Electrónico:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide line-clamp-2">
                                    {data.user.email || "no se ingresó"}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md ">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Rol:
                                </span>
                                <span
                                    class={`${icoRoleColor(
                                        data.user.role.id
                                    )} px-4 py-1 self-start rounded-md text-white`}
                                >
                                    <i
                                        class={`fa-solid ${icoRole(
                                            data.user.role.id
                                        )} mr-1`}
                                    />
                                    {data.user.role.name}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3   p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Habilitado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide line-clamp-2">
                                    {data.user.enabled ? "verdadero" : "falso"}
                                </span>
                            </div>
                        </div>
                        <div class="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md  ">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Slug:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.slug}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3   p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Fecha de nacimiento:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide flex flex-col">
                                    {data.user.birthday ? (
                                        <>
                                            <span>
                                                {formatDate(
                                                    data.user
                                                        .birthday as unknown as string
                                                )}
                                            </span>
                                            <span>
                                                <i class="fas fa-birthday-cake" />{" "}
                                                {new Date().getFullYear() -
                                                    new Date(
                                                        data.user.birthday
                                                    ).getFullYear()}{" "}
                                                años
                                            </span>
                                        </>
                                    ) : (
                                        "no se ingresó"
                                    )}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md  ">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Dirección:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.address || "no se ingresó"}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3   p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Mapa de ubicación:
                                </span>
                                {isLoaded && data.user.map ? (
                                    <GoogleMapPreact
                                        center={data.user.map}
                                        zoom={15}
                                        mapContainerStyle={{
                                            width: "100%",
                                            height: "200px",
                                        }}
                                    >
                                        <MarkerMarkPreact
                                            position={data.user.map}
                                        />
                                    </GoogleMapPreact>
                                ) : (
                                    <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                        {data.user.birthday || "no se ingresó"}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div class="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md ">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Telefono:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.telephone ? (
                                        <div class="flex gap-1 items-center">
                                            <i class="fas fa-mobile-alt" />
                                            {numberPhoneFormated(
                                                data.user.telephone
                                            )}
                                        </div>
                                    ) : (
                                        "no se ingresó"
                                    )}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3  p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    google:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.user.google || "no se ingresó"}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-1 bg-paper-light dark:bg-admin-terciary p-2 rounded-md ">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Creado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(data.user.createdAt)}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-1 p-2 ">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Actualizado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(data.user.updatedAt)}
                                </span>
                            </div>
                            {authPermissionModifierGuard() &&
                            data.user.role.id !== 1 ? (
                                <div class="flex gap-1 flex-col mb-1 ">
                                    <span class="text-primary dark:text-terciary font-bold">
                                        Acciones:
                                    </span>
                                    <div class="flex items-center gap-1 text-white">
                                        <a
                                            class="px-4 py-2 gap-2 flex items-center rounded-md bg-blue-600"
                                            href={`/admin/users/${data.user.slug}/edit`}
                                        >
                                            <i class="fa-solid text-sm fa-pen lg:mr-1" />
                                            <span class="text-xs">Editar</span>
                                        </a>
                                        {useAuthstore().state.id !==
                                        data.user.id ? (
                                            <button
                                                class="px-4 py-2 rounded-md bg-red-600 flex items-center"
                                                type="button"
                                                aria-label="button to delete user"
                                                onClick={() => {
                                                    sweetModal({
                                                        title: "Estas seguro?",
                                                        text: `Quieres eliminar esta categoría <b>${data.user.name}</b>`,
                                                        icon: "danger",
                                                        showCancelButton: true,
                                                        confirmButtonText:
                                                            "Si, Eliminar!",
                                                    }).then((result) => {
                                                        if (
                                                            result.isConfirmed
                                                        ) {
                                                            mutate(
                                                                data.user.id,
                                                                {
                                                                    onSuccess:
                                                                        () => {
                                                                            sweetModal(
                                                                                {
                                                                                    icon: "success",
                                                                                    title: "Success",
                                                                                    text: `La categoría ${data.user.name} fue eliminado correctamente`,
                                                                                }
                                                                            );
                                                                            history.back();
                                                                        },
                                                                    onError: (
                                                                        error
                                                                    ) => {
                                                                        sweetModal(
                                                                            {
                                                                                icon: "danger",
                                                                                text: `La categoría ${
                                                                                    data
                                                                                        .user
                                                                                        .name
                                                                                } no fue eliminado, comunicarse con el desarrollador:${JSON.stringify(
                                                                                    error
                                                                                )}`,
                                                                                title: "Error!",
                                                                            }
                                                                        );
                                                                    },
                                                                }
                                                            );
                                                        }
                                                    });
                                                }}
                                            >
                                                <i class="fa-solid text-sm fa-trash px-1" />
                                                <span class="text-xs">
                                                    Eliminar
                                                </span>
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return component;
}

export default UsersShow;
