import Form from "~/components/form";
import {
    type CategoriesStoreDto,
    categoriesStoreDto,
} from "../dtos/categories.store.dto";
import { slug as transformSlug } from "@vigilio/express-core/helpers";
import { useForm } from "react-hook-form";
import { categoriesStoreApi } from "../apis/categories.store.api";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect } from "preact/hooks";
interface CategoriesStoreProps {
    refetch: (clean?: boolean | undefined) => Promise<void>;
}
function CategoriesStore({ refetch }: CategoriesStoreProps) {
    const form = useForm<CategoriesStoreDto>({
        resolver: valibotResolver(categoriesStoreDto),
        mode: "all",
    });
    const { setValue, watch } = form;
    const { mutate, isLoading } = categoriesStoreApi();
    const onAddCategory = (data: CategoriesStoreDto) => {
        mutate(data, {
            onSuccess(data) {
                form.reset();
                sweetModal({
                    icon: "success",
                    text: `<p class="text-center">Nueva categoría insertado correctamente <b>${data.category.name}</b></p>`,
                });
                refetch();
            },
            onError(error) {
                if (error?.body) {
                    form.setError(error.body as keyof CategoriesStoreDto, {
                        message: error.message,
                    });
                    form.resetField(error.body, { keepError: true });

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
    const name = watch("name");
    useEffect(() => {
        setValue("slug", transformSlug(name || ""));
    }, [name]);

    return (
        <div className="text-start  mt-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                    <i class="fa-solid fa-layer-group" />
                    Agregar Categoría
                </h3>
            </div>
            <Form {...form} onSubmit={onAddCategory}>
                <div class="flex justify-end items-center mb-4">
                    <Form.button.reset />
                </div>
                <div class="flex flex-col gap-4 justify-center items-center">
                    <div class="w-full flex flex-col md:flex-row gap-2">
                        <Form.control
                            name={"name" as keyof CategoriesStoreDto}
                            title="Nombre"
                            placeholder="Nombre de categoria"
                        />

                        <Form.control
                            name={"icon" as keyof CategoriesStoreDto}
                            title="Icono"
                            type="text"
                            placeholder="<i class='fa-solid fa-brush'></i>"
                            question={
                                <p>
                                    Busque un icono{" "}
                                    <a
                                        class="font-bold underline"
                                        href="https://fontawesome.com/search"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Aquí
                                    </a>{" "}
                                    y copie y pegue
                                </p>
                            }
                        />
                    </div>
                    <Form.control.file
                        name={"image" as keyof CategoriesStoreDto}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        title="Imagenes"
                        typeFile="image"
                    />
                    <div class="w-full flex flex-col md:flex-row gap-2">
                        <Form.control
                            name={"slug" as keyof CategoriesStoreDto}
                            title="Slug"
                            placeholder="nombre-de-categoria"
                            options={{ setValueAs: transformSlug }}
                            disabled
                        />
                    </div>
                    <Form.button.submit
                        isLoading={isLoading || false}
                        title="Guardar"
                    />
                </div>
            </Form>
        </div>
    );
}

export default CategoriesStore;
