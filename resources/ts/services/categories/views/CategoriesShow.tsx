import { formatDate } from "@vigilio/express-core/helpers";
import { categoriesShowApi } from "../apis/categories.show.api";
import { sweetModal } from "@vigilio/sweet";
import { categoriesDestroyApi } from "../apis/categories.destroy.api";
import View404 from "@/admin/views/404";
import Loading from "@/admin/components/Loading";
import { printImagesCategories } from "../lib/helpers";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
interface CategoriesShowProps {
    params: { slug?: string | number };
}
function CategoriesShow({ params: { slug } }: CategoriesShowProps) {
    const { mutate } = categoriesDestroyApi();

    const { data, isSuccess, isLoading, isError } = categoriesShowApi(
        slug as string
    );
    let component = null;

    if (isLoading) {
        component = <Loading />;
    }
    if (isError) {
        component = (
            <View404 message={`No se encontró una categoria ${slug}`} />
        );
    }
    if (isSuccess && data) {
        const images = printImagesCategories(data.category.image, 500);

        component = (
            <div class="p-4">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "categories", uri: "/categories" }]}
                        current={data.category.name}
                    />
                </div>
                <div className="flex gap-4 flex-col text-start p-4">
                    <img
                        src={images[0]}
                        class="rounded-md mb-5 w-[150px] h-[150px] object-cover  mx-auto"
                        width="150"
                        height="150"
                        alt={data.category.name}
                    />
                    <div className="flex gap-4 flex-wrap justify-center  font-semibold">
                        <div className="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    ID:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.category.id}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Nombre:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.category.name}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Icono:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    <div
                                        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                        dangerouslySetInnerHTML={{
                                            __html: data.category.icon,
                                        }}
                                    />
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Slug:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.category.slug}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Creado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(
                                        data.category.createdAt as string
                                    )}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Actualizado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(
                                        data.category.updatedAt as string
                                    )}
                                </span>
                            </div>

                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Acciones:
                                </span>
                                <div class="flex items-center gap-1 text-white">
                                    <a
                                        class="px-4 py-2 gap-2 flex items-center rounded-md bg-blue-600"
                                        href={`/admin/categories/${data.category.slug}/edit`}
                                    >
                                        <i class="fa-solid text-sm fa-pen lg:mr-1" />
                                        <span class="text-xs">Editar</span>
                                    </a>
                                    <button
                                        class="px-4 py-2 rounded-md bg-red-600 flex items-center"
                                        type="button"
                                        aria-label="button to delete category"
                                        onClick={() => {
                                            sweetModal({
                                                title: "Estas seguro?",
                                                text: `Quieres eliminar esta categoría <b>${data.category.name}</b>`,
                                                icon: "danger",
                                                showCancelButton: true,
                                                confirmButtonText:
                                                    "Si, Eliminar!",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    mutate(data.category.id, {
                                                        onSuccess: () => {
                                                            sweetModal({
                                                                icon: "success",
                                                                title: "Success",
                                                                text: `La categoría ${data.category.name} fue eliminado correctamente`,
                                                            });
                                                            history.back();
                                                        },
                                                        onError: (error) => {
                                                            sweetModal({
                                                                icon: "danger",
                                                                text: `La categoría ${
                                                                    data
                                                                        .category
                                                                        .name
                                                                } no fue eliminado, comunicarse con el desarrollador:${JSON.stringify(
                                                                    error
                                                                )}`,
                                                                title: "Error!",
                                                            });
                                                        },
                                                    });
                                                }
                                            });
                                        }}
                                    >
                                        <i class="fa-solid text-sm fa-trash px-1" />
                                        <span class="text-xs">Eliminar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {images.length > 1 ? (
                        <div class="flex flex-wrap gap-1 mt-2">
                            {images.map((img) => (
                                <img
                                    src={img}
                                    width="50"
                                    height="50"
                                    class="w-[50px] h-[50px] object-cover"
                                    alt={data.category.name}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
    return component;
}

export default CategoriesShow;
