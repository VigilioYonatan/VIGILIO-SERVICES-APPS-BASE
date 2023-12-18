import { printFileUser } from "@/users/lib/helpers";
import useAuthstore from "../stores/auth.store";
import { useForm } from "react-hook-form";
import { valibotVigilio } from "~/lib/valibot";
import { formatDateTwo } from "~/lib/helpers";
import {
    type AuthUsersUpdateDto,
    authUsersUpdateDto,
} from "../dtos/auth.users.update.dto";
import Form from "~/components/form";

function AuthProfile() {
    const { state } = useAuthstore();
    const formAuthUsersUpdate = useForm<AuthUsersUpdateDto>({
        resolver: valibotVigilio(authUsersUpdateDto),
        mode: "all",
        values: {
            name: state.name,
            password: "",
            address: state.address,
            father_lastname: state.father_lastname,
            mother_lastname: state.mother_lastname,
            telephone: state.telephone,
            birthday: state.birthday
                ? (formatDateTwo(state.birthday, "YYYY-MM-DD") as Date)
                : undefined,
        },
    });

    const onAuthUpdateUser = (_data: AuthUsersUpdateDto) => {
        // mutateUsersUpdateApi.mutate(data, {
        //     onSuccess(data) {
        //         formUsersUpdate.reset();
        //         sweetModal({
        //             icon: "success",
        //             text: `<p class="text-center">Nuevo lenguaje insertado correctamente <b>${data.message}</b></p>`,
        //         });
        //     },
        //     onError(error) {
        //         if (error?.body) {
        //             formUsersUpdate.setError(
        //                 error.body as keyof UsersUpdateDto,
        //                 {
        //                     message: error.message,
        //                 }
        //             );
        //             formUsersUpdate.resetField(
        //                 error.body as keyof UsersUpdateDto,
        //                 {
        //                     keepError: true,
        //                 }
        //             );
        //             return;
        //         }
        //         sweetModal({
        //             icon: "danger",
        //             title: "Error en el servidor",
        //             text: `Comunicarse con el desarrollador ${error}`,
        //         });
        //     },
        // });
    };
    return (
        <section class="flex gap-5 flex-col md:flex-row dark:bg-paper-dark bg-background-light shadow-md max-w-6xl mx-auto p-8 ">
            <div class="flex flex-col gap-4 md:w-[400px]">
                <h2 class="text-primary font-vigilio-title px-3 mx-auto">
                    Mi Perfil
                </h2>
                <img
                    src={printFileUser(state.foto)[0]}
                    width={100}
                    height={100}
                    class="rounded-full mx-auto"
                    alt={state.name}
                />
                <ul class="flex md:flex-col gap-2 justify-center sm:justify-start">
                    <li class="py-2 px-3 rounded-sm hover:bg-primary delay-custom-1">
                        <p class="dark:text-secondary-light text-secondary-dark  font-vigilio-p">
                            <i class="fas fa-user" />{" "}
                            <span class=" hidden md:inline">
                                Información Personal
                            </span>
                        </p>
                    </li>
                    <li class="py-2 px-3 rounded-sm  hover:bg-primary delay-custom-1">
                        <p class="dark:text-secondary-light text-secondary-dark font-vigilio-p">
                            <i class="fas fa-box" />{" "}
                            <span class=" hidden md:inline"> Mis pedidos</span>
                        </p>
                    </li>
                    <li class="py-2 px-3 rounded-sm  hover:bg-primary delay-custom-1">
                        <p class="dark:text-secondary-light text-secondary-dark font-vigilio-p">
                            <i class="fas fa-tools" />{" "}
                            <span class=" hidden md:inline">
                                {" "}
                                Configuración
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="w-full">
                <h2 class="text-primary font-vigilio-subtitle mb-3">
                    Información Personal
                </h2>
                <div>
                    <Form {...formAuthUsersUpdate} onSubmit={onAuthUpdateUser}>
                        <div class="w-full flex flex-col sm:flex-row gap-2">
                            <Form.control.web
                                ico={<i class="fas fa-user" />}
                                name={"name" as keyof AuthUsersUpdateDto}
                                title="Nombre"
                                placeholder="Jhon"
                            />
                        </div>
                        <div class="w-full flex gap-2">
                            <Form.control.web
                                ico={<i class="fas fa-male" />}
                                name={
                                    "father_lastname" as keyof AuthUsersUpdateDto
                                }
                                title="Apellido paterno"
                                placeholder=""
                            />
                            <Form.control.web
                                ico={<i class="fas fa-female" />}
                                name={
                                    "mother_lastname" as keyof AuthUsersUpdateDto
                                }
                                title="Apellido materno"
                                placeholder=""
                            />
                        </div>
                        <div class="w-full flex gap-2">
                            <Form.control.web
                                ico={<i class="fas fa-lock" />}
                                name={"password" as keyof AuthUsersUpdateDto}
                                type="password"
                                title="Contraseña"
                                placeholder="*******"
                                autoComplete="current-password"
                            />
                        </div>
                        <div class="w-full flex gap-2">
                            <Form.control.web
                                ico={<i class="fas fa-mobile-alt" />}
                                name={"telephone" as keyof AuthUsersUpdateDto}
                                type="tel"
                                title="Numero de Celular"
                                placeholder="999999999"
                            />
                        </div>
                        <div class="w-full flex gap-2">
                            <Form.control.web
                                ico={<i class="fas fa-birthday-cake" />}
                                name={"birthday" as keyof AuthUsersUpdateDto}
                                type="date"
                                title="Fecha de Nacimiento"
                            />
                        </div>
                        <div class="flex justify-center">
                            <Form.button.submit
                                isLoading={false}
                                ico={<i class="fas fa-pen" />}
                                title="Guardar Cambios"
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export default AuthProfile;
