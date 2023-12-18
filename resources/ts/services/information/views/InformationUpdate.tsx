import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import Container from "@/admin/components/Container";
import { useForm } from "react-hook-form";
import Form from "~/components/form";
import { InformationSchema } from "../schemas/information.schema";
import { useEffect, useMemo } from "preact/hooks";
import {
    InformationLogoUpdateDto,
    InformationUpdateDto,
    informationLogoUpdateDto,
    informationUpdateDto,
} from "../dtos/information.update.dto";
import Loading from "@/admin/components/Loading";
import View404 from "@/admin/views/404";
import { informationShowApi } from "../apis/information.show.api";
import { valibotVigilio } from "~/lib/valibot";
import { printLogoInformation } from "../lib/helpers";
import {
    informationUpdateApi,
    usersUpdateFotoApi,
} from "../apis/information.update.api";
import { sweetModal } from "@vigilio/sweet";
import { authPermissionAdmin } from "@/auth/stores/auth.store";

function InformationUpdate() {
    if (!authPermissionAdmin()) {
        window.history.back();
        return null;
    }
    const query = informationShowApi(1);
    let component = null;
    if (query.isLoading) {
        component = <Loading />;
    }
    if (query.error) {
        component = <View404 />;
    }
    if (query.isSuccess && query.data) {
        const informationUpdateMutation = informationUpdateApi(1);
        const informationUpdateFotoMutation = usersUpdateFotoApi(1);

        const information = query.data.information;
        const settingsUpdateform = useForm<InformationUpdateDto>({
            resolver: valibotVigilio(informationUpdateDto),
            mode: "all",
            values: useMemo(() => {
                if (query.data) {
                    const { logo, createdAt, updatedAt, id, ...rest } =
                        query.data.information;
                    return rest;
                }
            }, []),
        });
        const settingsLogoUpdateform = useForm<InformationLogoUpdateDto>({
            resolver: valibotVigilio(informationLogoUpdateDto),
            mode: "all",
        });
        useEffect(() => {
            async function init() {
                if (information.logo) {
                    const response = await fetch(
                        printLogoInformation(information.logo, 300)[0]
                    );
                    const result = await response.blob();
                    const nuevoArchivo = new File(
                        [result],
                        information.logo[0].file,
                        {
                            type: "image/webp",
                        }
                    );

                    settingsLogoUpdateform.setValue("logo", [nuevoArchivo]);
                }
            }
            init();
        }, []);
        function onUpdateInformation(body: InformationUpdateDto) {
            informationUpdateMutation.mutate(body, {
                onSuccess(data) {
                    sweetModal({
                        icon: "success",
                        text: `Actualizado correctamete tu aplicación: ${data.information.name}`,
                    });
                    settingsUpdateform.reset();
                },
                onError(error) {
                    if (error.body) {
                        settingsUpdateform.setError(error.body, {
                            message: error.message,
                        });
                        settingsUpdateform.resetField(error.body, {
                            keepError: true,
                        });
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
        function onUpdateLogoInformation(body: InformationLogoUpdateDto) {
            informationUpdateFotoMutation.mutate(
                { ...body, name: information.name },
                {
                    onSuccess() {
                        sweetModal({
                            icon: "success",
                            text: "Actualizado logo correctamente",
                        }).then(({ isConfirmed }) => {
                            if (isConfirmed) {
                                window.location.reload();
                            }
                        });
                    },
                    onError(error) {
                        sweetModal({
                            icon: "danger",
                            title: "Error en el servidor",
                            text: `Comunicarse con el desarrollador ${error}`,
                        });
                    },
                }
            );
        }

        const enabled = settingsUpdateform.watch("enabled");

        useEffect(() => {
            settingsUpdateform.setFocus(
                "telephoneSecond" as keyof InformationUpdateDto,
                {
                    shouldSelect: true,
                }
            );
        }, [settingsUpdateform.setFocus]);
        useEffect(() => {
            if (enabled) {
                settingsUpdateform.setValue(
                    "enabled",
                    JSON.parse(enabled as unknown as string),
                    {
                        shouldValidate: true,
                    }
                );
            }
        }, [enabled]);
        component = (
            <Container>
                <div className="mx-1 lg:mx-6 flex flex-col gap-4">
                    <AdminBreadCrumb current="configuración" />
                </div>
                <div class="p-4">
                    <Form
                        {...settingsUpdateform}
                        onSubmit={onUpdateInformation}
                    >
                        <div class="flex justify-end items-center mb-4">
                            <Form.button.reset />
                        </div>
                        <div class="flex flex-col gap-4 justify-center items-center">
                            <div class="w-full flex flex-col md:flex-row gap-2">
                                <Form.control
                                    name={"name" as keyof InformationSchema}
                                    title="Nombre"
                                    placeholder="Nombre de empresa"
                                />
                                <Form.control
                                    name={"email" as keyof InformationSchema}
                                    title="Correo electrónico"
                                    type="text"
                                    placeholder="tuempresa@gmail.com"
                                    ico={<i class="fas fa-at" />}
                                />
                            </div>
                            <div class="w-full flex flex-col md:flex-row gap-2">
                                <Form.control
                                    name={
                                        "telephoneFirst" as keyof InformationSchema
                                    }
                                    type="tel"
                                    title="Primer  Telefono"
                                    ico={<i class="fas fa-mobile-alt" />}
                                />
                                <Form.control
                                    name={
                                        "telephoneSecond" as keyof InformationSchema
                                    }
                                    type="tel"
                                    title="Segundo Telefono"
                                    ico={<i class="fas fa-mobile-alt" />}
                                    question="Este campo no es obligatorio"
                                />
                            </div>
                            <div class="w-full flex flex-col md:flex-row gap-2">
                                <Form.control
                                    name={
                                        "telephoneThird" as keyof InformationSchema
                                    }
                                    type="tel"
                                    title="Tercer Telefono"
                                    ico={<i class="fas fa-mobile-alt" />}
                                    question="Este campo no es obligatorio"
                                />
                                <Form.control
                                    name={"mapa" as keyof InformationSchema}
                                    title="Mapa"
                                    type="text"
                                    placeholder="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4643.604312068362!2d-77.06682864829563!3d-11.849952801726479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1700097685639!5m2!1ses-419!2spe"
                                    ico={<i class="fas fa-map" />}
                                    question={
                                        <span class="text-xs">
                                            <a
                                                href="https://www.google.com/maps"
                                                target="_blank"
                                                class="font-bold hover:underline"
                                                rel="noreferrer"
                                            >
                                                Google Maps
                                            </a>
                                            <br />
                                            click en tu localidad {">"}{" "}
                                            compartir{" "}
                                            <i class="fas fa-share-alt" /> {">"}{" "}
                                            incorporar un mapa {">"} copiar src
                                        </span>
                                    }
                                />
                            </div>
                            <Form.control.area
                                name={"about" as keyof InformationSchema}
                                title="Acerca de la empresa"
                                placeholder="xxxxxxxxxx"
                            />
                            <span class="font-semibold dark:text-secondary-light">
                                Redes Sociales
                            </span>
                            <div class="w-full flex flex-col md:flex-row gap-2">
                                <Form.control
                                    name={"facebook" as keyof InformationSchema}
                                    title="Facebook"
                                    ico={<i class="fab fa-facebook" />}
                                    placeholder="facebook de empresa"
                                    question="Este campo no es obligatorio"
                                />
                                <Form.control
                                    name={"tiktok" as keyof InformationSchema}
                                    title="Tik Tok"
                                    ico={<i class="fab fa-tiktok" />}
                                    question="Este campo no es obligatorio"
                                    placeholder="Tik Tok de empresa"
                                />
                                <Form.control
                                    name={"twitter" as keyof InformationSchema}
                                    title="Twitter"
                                    ico={<i class="fab fa-twitter" />}
                                    placeholder="Twitter de empresa"
                                />
                            </div>
                            <div class="w-full flex flex-col md:flex-row gap-2">
                                <Form.control
                                    name={
                                        "instagram" as keyof InformationSchema
                                    }
                                    title="Instagram"
                                    ico={<i class="fab fa-instagram" />}
                                    placeholder="Instagram de empresa"
                                    question="Este campo no es obligatorio"
                                />
                                <Form.control
                                    name={"youtube" as keyof InformationSchema}
                                    title="Youtube"
                                    ico={<i class="fab fa-youtube" />}
                                    placeholder="Youtube de empresa"
                                    question="Este campo no es obligatorio"
                                />
                                <Form.control.select
                                    name={"enabled" as keyof InformationSchema}
                                    title="Habilitar"
                                    placeholder="Escoger opción"
                                    array={[
                                        { key: true, value: "Habilitar" },
                                        { key: false, value: "Deshabilitar" },
                                    ]}
                                    question={
                                        <>
                                            Su web no se mostrará a los
                                            clientes.
                                            <br />
                                            Este campo no es obligatorio.
                                        </>
                                    }
                                />
                            </div>
                            <Form.button.submit
                                isLoading={false || false}
                                title="Guardar"
                            />
                        </div>
                    </Form>

                    <Form
                        {...settingsLogoUpdateform}
                        onSubmit={onUpdateLogoInformation}
                    >
                        <Form.control.file
                            name={"logo" as keyof InformationSchema}
                            title="Logo de la empresa"
                            typeFile="image"
                        />
                        <Form.button.submit
                            isLoading={false || false}
                            title="Guardar"
                        />
                    </Form>
                </div>
            </Container>
        );
    }

    return component;
}

export default InformationUpdate;
