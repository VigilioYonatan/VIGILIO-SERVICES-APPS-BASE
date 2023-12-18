import { useForm } from "react-hook-form";
import {
    type CategoriesUpdateDto,
    categoriesUpdateDto,
} from "../dtos/categories.update.dto";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { categoriesUpdateApi } from "../apis/categories.update.api";
import { sweetModal } from "@vigilio/sweet";
import { useEffect, useMemo } from "preact/hooks";
import { slug as transformSlug } from "@vigilio/express-core/helpers";
import Form from "~/components/form";
import { categoriesShowApi } from "../apis/categories.show.api";
import Loading from "@/admin/components/Loading";
import View404 from "@/admin/views/404";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";

interface CategoriesUpdateProps {
    params: { slug?: string | number };
}
function CategoriesUpdate({ params: { slug } }: CategoriesUpdateProps) {
    const query = categoriesShowApi(slug as string);

    const { mutate, isLoading } = categoriesUpdateApi();
    let component = null;

    if (query.isLoading) {
        component = <Loading />;
    }
    if (query.isError) {
        component = (
            <View404 message={`No se encontró una categoría ${slug}`} />
        );
    }
    if (query.isSuccess && query.data) {
        const formCategoriesUpdate = useForm<CategoriesUpdateDto>({
            resolver: valibotResolver(categoriesUpdateDto),
            mode: "all",
            values: useMemo(() => query.data?.category, []),
        });
        const onUpdateCategory = (data: CategoriesUpdateDto) => {
            mutate(data, {
                onSuccess(data) {
                    formCategoriesUpdate.reset();
                    sweetModal({
                        icon: "success",
                        text: `<p class="text-center">Nueva categoría insertado correctamente <b>${data.category.name}</b></p>`,
                    });
                    query.refetch();
                },
                onError(error) {
                    if (error?.body) {
                        formCategoriesUpdate.setError(
                            error.body as keyof CategoriesUpdateDto,
                            { message: error.message }
                        );
                        formCategoriesUpdate.resetField(error.body, {
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
        };
        const name = formCategoriesUpdate.watch("name");
        useEffect(() => {
            formCategoriesUpdate.setValue("slug", transformSlug(name || ""));
        }, [name]);
        component = (
            <div class="p-4">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "categorías", uri: "/categories" }]}
                        current={query.data.category.name}
                    />
                </div>
                <div class="max-w-[800px] dark:bg-admin-paper-dark p-4 rounded-md">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                            <i class="fa-solid fa-layer-group" />
                            Editar Categoría - {query.data.category.name}
                        </h3>
                    </div>
                    <div className="flex flex-col  gap-4">
                        <Form
                            {...formCategoriesUpdate}
                            onSubmit={onUpdateCategory}
                        >
                            <div class="flex flex-col gap-4 justify-center items-center">
                                <div class="w-full flex flex-col md:flex-row gap-2">
                                    <Form.control
                                        name={
                                            "name" as keyof CategoriesUpdateDto
                                        }
                                        title="Nombre"
                                        placeholder="Nombre de categoría"
                                    />

                                    <Form.control
                                        name={
                                            "icon" as keyof CategoriesUpdateDto
                                        }
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
                                <div class="w-full flex flex-col md:flex-row gap-2">
                                    <Form.control
                                        name={
                                            "slug" as keyof CategoriesUpdateDto
                                        }
                                        title="Slug"
                                        placeholder="nombre-de-categoria"
                                        options={{ setValueAs: transformSlug }}
                                    />
                                </div>
                                <Form.button.submit
                                    isLoading={isLoading || false}
                                    title="Editar"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    return component;
}

export default CategoriesUpdate;
