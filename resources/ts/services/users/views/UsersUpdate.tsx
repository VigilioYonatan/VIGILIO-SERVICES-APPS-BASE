import { useForm } from "react-hook-form";
import {
    type UsersUpdateDto,
    usersUpdateDto,
    usersUpdateFotoDto,
    UsersUpdateFotoDto,
} from "../dtos/users.update.dto";
import { usersUpdateApi, usersUpdateFotoApi } from "../apis/users.update.api";
import { sweetModal } from "@vigilio/sweet";
import { useEffect, useMemo } from "preact/hooks";
import { slug as transformSlug } from "@vigilio/express-core/helpers";
import { UsersShowAPI, usersShowApi } from "../apis/users.show.api";
import Form from "~/components/form";
import Loading from "@/admin/components/Loading";
import View404 from "@/admin/views/404";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import { rolesIndexApi } from "@/roles/apis/roles.index.api";
import { valibotVigilio } from "~/lib/valibot";
import { formatDateTwo } from "~/lib/helpers";
import { printFileUser } from "../lib/helpers";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";
import AdminHr from "~/components/AdminHr";
import { JSX } from "preact/jsx-runtime";

interface UsersUpdateProps {
    params: { slug?: string | number };
}
function UsersUpdate({ params: { slug } }: UsersUpdateProps) {
    if (!authPermissionModifierGuard()) {
        window.history.back();
        return null;
    }
    const query = usersShowApi(slug as string);

    let component: JSX.Element | JSX.Element[] | null = null;

    if (query.isLoading) {
        component = <Loading />;
    }
    if (query.isError) {
        component = <View404 message={`No se encontró un usuario: ${slug}`} />;
    }
    if (query.isSuccess && query.data) {
        const user = query.data.user as UsersShowAPI["user"];
        const formUsersUpdate = useForm<UsersUpdateDto>({
            resolver: valibotVigilio(usersUpdateDto),
            mode: "all",
            values: useMemo(() => {
                const {
                    role,
                    createdAt,
                    updatedAt,
                    birthday,
                    foto,
                    id,
                    ...rest
                } = user;

                return {
                    ...rest,
                    role_id: role.id,
                    birthday: birthday
                        ? (formatDateTwo(birthday, "YYYY-MM-DD") as Date)
                        : undefined,
                };
            }, []),
        });
        const formUsersUpdateFoto = useForm<UsersUpdateFotoDto>({
            mode: "all",
            resolver: valibotVigilio(usersUpdateFotoDto),
        });

        async function initialUpdateFoto() {
            if (query.data?.user.foto) {
                const response = await fetch(
                    printFileUser(query.data.user.foto)[0]
                );
                const result = await response.blob();
                const nuevoArchivo = new File(
                    [result],
                    query.data.user.foto[0].file,
                    {
                        type: "image/webp",
                    }
                );
                formUsersUpdateFoto.setValue("foto", [nuevoArchivo]);
            }
        }
        useEffect(() => {
            initialUpdateFoto();
        }, []);

        const mutateUsersUpdateApi = usersUpdateApi(query.data.user.id);
        const mutateUsersUpdateFotoApi = usersUpdateFotoApi(query.data.user.id);
        const queryRole = rolesIndexApi();

        const arrayRoles = useMemo(
            () =>
                queryRole.isSuccess && queryRole.data
                    ? queryRole.data.data.map((rol) => ({
                          key: rol.id,
                          value: rol.name,
                      }))
                    : [],
            [queryRole]
        );

        const onUpdateUser = (data: UsersUpdateDto) => {
            mutateUsersUpdateApi.mutate(data, {
                onSuccess(data) {
                    formUsersUpdate.reset();
                    sweetModal({
                        icon: "success",
                        text: `<p class="text-center">Nuevo lenguaje insertado correctamente <b>${data.message}</b></p>`,
                    });
                },
                onError(error) {
                    if (error?.body) {
                        formUsersUpdate.setError(
                            error.body as keyof UsersUpdateDto,
                            {
                                message: error.message,
                            }
                        );
                        formUsersUpdate.resetField(
                            error.body as keyof UsersUpdateDto,
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
        };
        const onUpdateFotoUser = (data: UsersUpdateFotoDto) => {
            mutateUsersUpdateFotoApi.mutate(
                { ...data, name: user.name },
                {
                    onSuccess(data) {
                        sweetModal({
                            icon: "success",
                            text: data.message,
                        });
                    },
                }
            );
        };

        const enabled = formUsersUpdate.watch("enabled");
        useEffect(() => {
            if (enabled) {
                formUsersUpdate.setValue(
                    "enabled",
                    JSON.parse(enabled as unknown as string),
                    {
                        shouldValidate: true,
                    }
                );
            }
        }, [enabled]);
        component = (
            <div class="p-4 bg-background-light dark:bg-admin-background-dark shadow">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "usuarios", uri: "/users" }]}
                        current={query.data.user.name}
                    />
                </div>
                <div class="max-w-[800px] dark:bg-admin-paper-dark p-4 rounded-md">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                            <i class="fa-solid fa-users" />
                            Editar usuario - {query.data.user.name}
                        </h3>
                    </div>
                    <Form {...formUsersUpdate} onSubmit={onUpdateUser}>
                        <div class="flex justify-end items-center mb-4">
                            <Form.button.reset />
                        </div>
                        <div class="flex gap-4 flex-col lg:flex-row">
                            <div class="lg:w-1/2">
                                <div class="w-full flex flex-col sm:flex-row gap-2">
                                    <Form.control
                                        ico={<i class="fas fa-user" />}
                                        name={"name" as keyof UsersUpdateDto}
                                        title="Nombre"
                                        placeholder="Jhon"
                                    />
                                    <Form.control
                                        name={"slug" as keyof UsersUpdateDto}
                                        title="Slug"
                                        placeholder="Jhon"
                                        options={{ setValueAs: transformSlug }}
                                        disabled
                                    />
                                </div>
                                <div class="w-full flex flex-col sm:flex-row gap-2">
                                    <Form.control
                                        ico={<i class="fas fa-male" />}
                                        name={
                                            "father_lastname" as keyof UsersUpdateDto
                                        }
                                        title="Apellido paterno"
                                        placeholder=""
                                        question="Este campo no es obligatorio"
                                    />
                                    <Form.control
                                        ico={<i class="fas fa-female" />}
                                        name={
                                            "mother_lastname" as keyof UsersUpdateDto
                                        }
                                        title="Apellido materno"
                                        placeholder=""
                                        question="Este campo no es obligatorio"
                                    />
                                </div>
                                <div class="w-full flex flex-col sm:flex-row gap-2">
                                    <Form.control
                                        ico={<i class="fas fa-at" />}
                                        name={"email" as keyof UsersUpdateDto}
                                        type="email"
                                        title="Correo Electrónico"
                                        placeholder="correo@gmail.com"
                                    />
                                    <Form.control
                                        ico={<i class="fas fa-lock" />}
                                        name={
                                            "password" as keyof UsersUpdateDto
                                        }
                                        type="password"
                                        title="Contraseña"
                                        placeholder="*******"
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div class="w-full flex flex-col sm:flex-row gap-2">
                                    <Form.control
                                        ico={<i class="fas fa-mobile-alt" />}
                                        name={
                                            "telephone" as keyof UsersUpdateDto
                                        }
                                        type="tel"
                                        title="Numero de Celular"
                                        placeholder="999999999"
                                        question="Este campo no es obligatorio"
                                    />
                                    <Form.control.select
                                        name={"role_id" as keyof UsersUpdateDto}
                                        title="Rol"
                                        placeholder="Escoge el rol"
                                        array={arrayRoles}
                                        options={{ valueAsNumber: true }}
                                        ico={<i class="fas fa-user-tag" />}
                                    />
                                </div>
                                <div class="w-full flex flex-col sm:flex-row gap-2">
                                    <Form.control
                                        ico={<i class="fas fa-id-card" />}
                                        name={"dni" as keyof UsersUpdateDto}
                                        type="tel"
                                        title="DNI"
                                        placeholder="dni"
                                        question={
                                            "Este campo no es obligatorio"
                                        }
                                    />
                                    <Form.control
                                        ico={<i class="fas fa-birthday-cake" />}
                                        name={
                                            "birthday" as keyof UsersUpdateDto
                                        }
                                        type="date"
                                        title="Fecha de Nacimiento"
                                        placeholder="dni"
                                        question={
                                            "Este campo no es obligatorio"
                                        }
                                    />
                                </div>
                            </div>
                            <div class="lg:w-1/2">
                                <Form.control
                                    ico={<i class="fas fa-at" />}
                                    name={"address" as keyof UsersUpdateDto}
                                    title="Dirección"
                                    placeholder="MZ D LT - Puente Piedra"
                                />
                                <Form.control.select
                                    ico={<i class="fas fa-user-check" />}
                                    name={"enabled" as keyof UsersUpdateDto}
                                    title="Habilitado"
                                    placeholder="Habilitar usuario"
                                    array={[
                                        {
                                            key: true,
                                            value: "Verdadero",
                                        },
                                        { key: false, value: "Falso" },
                                    ]}
                                    question="El usuario podrá acceder si su cuenta esté habilitado"
                                />
                                <Form.control
                                    ico={
                                        <i class="fa-solid fa-users-rectangle" />
                                    }
                                    name={
                                        "especialidad" as keyof UsersUpdateDto
                                    }
                                    title="especialidad"
                                    placeholder=""
                                    question="Que especialidad es el usuario. ejemplo: cocinero, mozo,etc"
                                />
                                <Form.control.map
                                    title="Ubicación en mapa"
                                    name={"map" as keyof UsersUpdateDto}
                                    question={
                                        <ul class="list-disc">
                                            <li>
                                                Localidad del usuario en
                                                coordenadas
                                            </li>
                                            <li>
                                                Este campo no es obligatorio
                                            </li>
                                        </ul>
                                    }
                                />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <Form.button.submit
                                isLoading={
                                    mutateUsersUpdateApi.isLoading || false
                                }
                                ico={<i class="fas fa-pen" />}
                                title="Guardar Cambios"
                            />
                        </div>
                    </Form>
                    <AdminHr />
                    <div class="flex justify-between items-center">
                        <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                            <i class="fa-solid fa-image" />
                            Editar foto - {query.data.user.name}
                        </h3>
                    </div>
                    <Form {...formUsersUpdateFoto} onSubmit={onUpdateFotoUser}>
                        <Form.control.file
                            name={"foto" as keyof UsersUpdateFotoDto}
                            title="Foto de perfil"
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                            typeFile="image"
                        />
                        <div class="flex justify-center">
                            <Form.button.submit
                                isLoading={
                                    mutateUsersUpdateFotoApi.isLoading || false
                                }
                                ico={<i class="fas fa-pen" />}
                                title="Guardar Cambios"
                            />
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

    return component;
}

export default UsersUpdate;
