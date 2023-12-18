import Form from "~/components/form";
import { type UsersStoreDto, usersStoreDto } from "../dtos/users.store.dto";
import { slug as transformSlug } from "@vigilio/express-core/helpers";
import { useForm } from "react-hook-form";
import { usersStoreApi } from "../apis/users.store.api";
import { sweetModal } from "@vigilio/sweet";
import { useEffect, useMemo } from "preact/hooks";
import { rolesIndexApi } from "@/roles/apis/roles.index.api";
import { valibotVigilio } from "~/lib/valibot";
interface UsersStoreProps {
    refetch: (clean?: boolean | undefined) => Promise<void>;
}
function UsersStore({ refetch }: UsersStoreProps) {
    const usersStoreDtoForm = useForm<UsersStoreDto>({
        resolver: valibotVigilio(usersStoreDto),
    });
    const usersStoreApiMutation = usersStoreApi();
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

    const onAddUser = (data: UsersStoreDto) => {
        usersStoreApiMutation.mutate(data, {
            onSuccess(data) {
                usersStoreDtoForm.reset();
                sweetModal({
                    icon: "success",
                    text: `<p class="text-center">Nuevo producto insertado correctamente <b>${data.user.name}</b></p>`,
                });
                refetch();
            },
            onError(error) {
                if (error?.body) {
                    usersStoreDtoForm.setError(
                        error.body as keyof UsersStoreDto,
                        {
                            message: error.message,
                        }
                    );
                    usersStoreDtoForm.resetField(
                        error.body as keyof UsersStoreDto,
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

    const name = usersStoreDtoForm.watch("name");
    const enabled = usersStoreDtoForm.watch("enabled");

    useEffect(() => {
        if (name) {
            usersStoreDtoForm.setValue("slug", transformSlug(name || ""), {
                shouldValidate: true,
            });
        }
    }, [name]);

    useEffect(() => {
        if (enabled) {
            usersStoreDtoForm.setValue(
                "enabled",
                JSON.parse(enabled as unknown as string),
                {
                    shouldValidate: true,
                }
            );
        }
    }, [enabled]);

    return (
        <div class="text-start">
            <div class="flex justify-between items-center mb-4 ">
                <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                    <i class="fas fa-users" />
                    Agregar Usuario
                </h3>
            </div>
            <Form {...usersStoreDtoForm} onSubmit={onAddUser}>
                <div class="flex justify-end items-center mb-4">
                    <Form.button.reset />
                </div>
                <div class="flex gap-4 flex-col lg:flex-row">
                    <div class="lg:w-1/2">
                        <div class="w-full flex flex-col sm:flex-row gap-2">
                            <Form.control
                                ico={<i class="fas fa-user" />}
                                name={"name" as keyof UsersStoreDto}
                                title="Nombre"
                                placeholder="Jhon"
                            />
                            <Form.control
                                name={"slug" as keyof UsersStoreDto}
                                title="Slug"
                                placeholder="Jhon"
                                options={{ setValueAs: transformSlug }}
                                disabled
                            />
                        </div>
                        <div class="w-full flex flex-col sm:flex-row gap-2">
                            <Form.control
                                ico={<i class="fas fa-male" />}
                                name={"father_lastname" as keyof UsersStoreDto}
                                title="Apellido paterno"
                                placeholder=""
                                question="Este campo no es obligatorio"
                            />
                            <Form.control
                                ico={<i class="fas fa-female" />}
                                name={"mother_lastname" as keyof UsersStoreDto}
                                title="Apellido materno"
                                placeholder=""
                                question="Este campo no es obligatorio"
                            />
                        </div>
                        <div class="w-full flex flex-col sm:flex-row gap-2">
                            <Form.control
                                ico={<i class="fas fa-at" />}
                                name={"email" as keyof UsersStoreDto}
                                type="email"
                                title="Correo Electrónico"
                                placeholder="correo@gmail.com"
                            />
                            <Form.control
                                ico={<i class="fas fa-lock" />}
                                name={"password" as keyof UsersStoreDto}
                                type="password"
                                title="Contraseña"
                                placeholder="*******"
                                autoComplete="current-password"
                            />
                        </div>
                        <div class="w-full flex flex-col sm:flex-row gap-2">
                            <Form.control
                                ico={<i class="fas fa-mobile-alt" />}
                                name={"telephone" as keyof UsersStoreDto}
                                type="tel"
                                title="Numero de Celular"
                                placeholder="999999999"
                                question="Este campo no es obligatorio"
                            />
                            <Form.control.select
                                name={"role_id" as keyof UsersStoreDto}
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
                                name={"dni" as keyof UsersStoreDto}
                                type="tel"
                                title="DNI"
                                placeholder="dni"
                                question={"Este campo no es obligatorio"}
                            />
                            <Form.control
                                ico={<i class="fas fa-birthday-cake" />}
                                name={"birthday" as keyof UsersStoreDto}
                                type="date"
                                title="Fecha de Nacimiento"
                                placeholder="dni"
                                question={"Este campo no es obligatorio"}
                            />
                        </div>
                    </div>
                    <div class="lg:w-1/2">
                        <Form.control.file
                            name={"foto" as keyof UsersStoreDto}
                            title="Foto de perfil"
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                            typeFile="image"
                            typesText="No es obligatorio: JPG, JPEG, WEBP, PNG, GIF"
                        />
                        <div class="w-full flex flex-row gap-2 flex-wrap lg:flex-nowrap">
                            <div class="flex flex-col w-full">
                                <Form.control
                                    ico={<i class="fas fa-at" />}
                                    name={"address" as keyof UsersStoreDto}
                                    title="Dirección"
                                    placeholder="MZ D LT - Puente Piedra"
                                />
                                <Form.control.select
                                    ico={<i class="fas fa-user-check" />}
                                    name={"enabled" as keyof UsersStoreDto}
                                    title="Habilitado"
                                    placeholder="Habilitar usuario"
                                    array={[
                                        { key: true, value: "Verdadero" },
                                        { key: false, value: "Falso" },
                                    ]}
                                    question="El usuario no podrá acceder a su cuenta si no está habilitado, hacerlo si desea bloquear a un usuario"
                                />
                                <Form.control
                                    ico={
                                        <i class="fa-solid fa-users-rectangle" />
                                    }
                                    name={"especialidad" as keyof UsersStoreDto}
                                    title="especialidad"
                                    placeholder=""
                                    question="Que especialidad es el usuario. ejemplo: cocinero, mozo,etc"
                                />
                            </div>
                            <Form.control.map
                                title="Ubicación en mapa"
                                name={"map" as keyof UsersStoreDto}
                                question={
                                    <ul class="list-disc">
                                        <li>
                                            Localidad del usuario en coordenadas
                                        </li>
                                        <li>Este campo no es obligatorio</li>
                                    </ul>
                                }
                            />
                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <Form.button.submit
                        isLoading={usersStoreApiMutation.isLoading || false}
                        title="Guardar"
                    />
                </div>
            </Form>
        </div>
    );
}

export default UsersStore;
