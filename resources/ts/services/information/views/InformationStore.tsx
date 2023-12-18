import Form from "~/components/form";
import enviroments from "~/config";
import { useForm } from "react-hook-form";
import { valibotVigilio } from "~/lib/valibot";
import {
    type InformationStoreDto,
    informationStoreDto,
} from "../dtos/information.store.dto";
import { informationStoreApi } from "../apis/information.store.api";
import { sweetModal } from "@vigilio/sweet";

function InformationStore() {
    const informationStoreMutation = informationStoreApi();
    const informationStoreForm = useForm<InformationStoreDto>({
        mode: "all",
        resolver: valibotVigilio(informationStoreDto),
    });
    function onSubmitInformationStoreForm(body: InformationStoreDto) {
        informationStoreMutation.mutate(body, {
            onSuccess(data) {
                informationStoreForm.reset();
                sweetModal({
                    icon: "success",
                    text: `Bienvenido ${data.information.name}`,
                }).then(async () => {
                    const response = await fetch(
                        `${enviroments.VITE_URL}/api/seed`
                    );
                    const result = await response.json();
                    if (result.success) {
                        window.location.reload();
                    }
                });
            },
            onError(error) {
                if (error.body) {
                    informationStoreForm.setError(error.body, {
                        message: error.message,
                    });
                    informationStoreForm.resetField(error.body, {
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
    return (
        <section className="flex flex-col justify-center items-center bg-paper-light w-full min-h-screen">
            <div class="flex gap-2 mt-8">
                <img
                    class="object-cover"
                    width={80}
                    height={80}
                    src={`${enviroments.VITE_URL}/images/settings/vigilio-express.png`}
                    alt="vigilio-express"
                />
                <img
                    class="object-contain"
                    width={100}
                    src={`${enviroments.VITE_URL}/images/settings/vigilio-services.png`}
                    alt="vigilio-services"
                />
            </div>
            <div className="mt-6 max-w-[600px] w-full  rounded-md  p-6 bg-background-light mx-2">
                <Form
                    {...informationStoreForm}
                    onSubmit={onSubmitInformationStoreForm}
                >
                    <div class="flex justify-end items-center mb-4">
                        <Form.button.reset />
                    </div>
                    <div class="flex flex-col gap-4 justify-center items-center">
                        <div class="w-full flex flex-col md:flex-row gap-2">
                            <Form.control.web
                                name={"name" as keyof InformationStoreDto}
                                title="Nombre"
                                placeholder="Nombre de empresa"
                            />
                            <Form.control.web
                                name={"email" as keyof InformationStoreDto}
                                title="Correo electrónico"
                                type="text"
                                placeholder="tuempresa@gmail.com"
                                ico={<i class="fas fa-at" />}
                            />
                        </div>
                        <div class="w-full flex flex-col md:flex-row gap-2">
                            <Form.control.web
                                name={
                                    "telephoneFirst" as keyof InformationStoreDto
                                }
                                type="tel"
                                title="Primer  Telefono"
                                ico={<i class="fas fa-mobile-alt" />}
                            />
                            <Form.control.web
                                name={
                                    "telephoneSecond" as keyof InformationStoreDto
                                }
                                type="tel"
                                title="Segundo Telefono"
                                ico={<i class="fas fa-mobile-alt" />}
                                question="Este campo no es obligatorio"
                            />
                        </div>
                        <div class="w-full flex flex-col md:flex-row gap-2">
                            <Form.control.web
                                name={
                                    "telephoneThird" as keyof InformationStoreDto
                                }
                                type="tel"
                                title="Tercer Telefono"
                                ico={<i class="fas fa-mobile-alt" />}
                                question="Este campo no es obligatorio"
                            />
                            <Form.control.web
                                name={"mapa" as keyof InformationStoreDto}
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
                                        click en tu localidad {
                                            ">"
                                        } compartir{" "}
                                        <i class="fas fa-share-alt" /> {">"}{" "}
                                        incorporar un mapa {">"} copiar src
                                    </span>
                                }
                            />
                        </div>
                        <Form.control.area
                            name={"about" as keyof InformationStoreDto}
                            title="Acerca de la empresa"
                            placeholder="xxxxxxxxxx"
                        />
                        <span class="font-semibold dark:text-secondary-light">
                            Redes Sociales
                        </span>
                        <div class="w-full flex flex-col md:flex-row gap-2">
                            <Form.control.web
                                name={"facebook" as keyof InformationStoreDto}
                                title="Facebook"
                                ico={<i class="fab fa-facebook" />}
                                placeholder="Facebook de empresa"
                                question="Este campo no es obligatorio"
                            />
                            <Form.control.web
                                name={"tiktok" as keyof InformationStoreDto}
                                title="Tik Tok"
                                ico={<i class="fab fa-tiktok" />}
                                placeholder="Nombre de empresa"
                                question="Este campo no es obligatorio"
                            />
                        </div>
                        <div class="w-full flex flex-col md:flex-row gap-2">
                            <Form.control.web
                                name={"instagram" as keyof InformationStoreDto}
                                title="Instagram"
                                ico={<i class="fab fa-instagram" />}
                                placeholder="Instagram de empresa"
                                question="Este campo no es obligatorio"
                            />
                            <Form.control.web
                                name={"youtube" as keyof InformationStoreDto}
                                title="Youtube"
                                ico={<i class="fab fa-youtube" />}
                                placeholder="Youtube de empresa"
                                question="Este campo no es obligatorio"
                            />
                        </div>
                        <Form.control.file
                            name={"logo" as keyof InformationStoreDto}
                            title="Logo de la empresa"
                            typeFile="image"
                            accept="image/jpg, image/png, image/webp, image/jpeg, image/gif"
                        />
                        <Form.button.submit
                            isLoading={false || false}
                            title="Guardar"
                        />
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default InformationStore;
