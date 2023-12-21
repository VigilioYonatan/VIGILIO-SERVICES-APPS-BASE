import { formatDate } from "@vigilio/express-core/helpers";
import { productsShowApi } from "../apis/products.show.api";
import { sweetModal } from "@vigilio/sweet";
import { productsDestroyApi } from "../apis/products.destroy.api";
import Svg404 from "~/components/Svg404";
import { printImagesProduct } from "../lib/helpers";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
interface ProductsShowProps {
    params: { slug?: string | number };
}
function ProductsShow({ params: { slug } }: ProductsShowProps) {
    const { mutate } = productsDestroyApi();

    const { data, isSuccess, isLoading, error, isError } = productsShowApi(
        slug as string
    );
    let component = null;

    if (isLoading) {
        component = <div>cargando...</div>;
    }
    if (isError) {
        component = (
            <div class="max-w-[500px]">
                <span class="dark:text-white text-black text-2xl font-bold text-center">
                    {error?.message ? error.message : JSON.stringify(error)}
                </span>
                <div>
                    <Svg404 />
                </div>
            </div>
        );
    }
    if (isSuccess && data) {
        const images = printImagesProduct(data.product.images, 500);

        component = (
            <div class="p-4">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "productos", uri: "/products" }]}
                        current={data.product.name}
                    />
                </div>
                <div class="flex gap-4 flex-col text-start">
                    <img
                        src={images[0]}
                        class="rounded-md mb-5 w-[150px] h-[150px] object-cover  mx-auto"
                        width="150"
                        height="150"
                        alt={data.product.name}
                    />
                    <div class="flex gap-4 flex-wrap justify-center  font-semibold">
                        <div class="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    ID:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.product.id}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Name:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.product.name}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Descripción:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide line-clamp-2">
                                    {data.product.description}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Slug:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.product.slug}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Descuento:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide line-clamp-2">
                                    {data.product.discount
                                        ? Number(
                                              data.product
                                                  .discount as unknown as string
                                          )
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Habilitado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.product.enabled
                                        ? "Habilitado"
                                        : "Desabilitado"}
                                </span>
                            </div>
                        </div>
                        <div class="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Precio:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    S/. {data.product.price}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Stock:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {data.product.ilimit
                                        ? "en stock"
                                        : `${data.product.stock} unidades`}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Categoria:
                                </span>
                                <a
                                    href={`/admin/categories/${data.product.categories.id}`}
                                    class="dark:text-secondary-light text-secondary-dark tracking-wide"
                                >
                                    {data.product.categories.name}
                                </a>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Creado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(data.product.createdAt)}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Actualizado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(data.product.updatedAt)}
                                </span>
                            </div>

                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Acciones:
                                </span>
                                <div class="flex items-center gap-1 text-white">
                                    <a
                                        class="px-4 py-2 gap-2 flex items-center rounded-md bg-blue-600"
                                        href={`/admin/products/${data.product.slug}/update`}
                                    >
                                        <i class="fa-solid text-sm fa-pen lg:mr-1" />
                                        <span class="text-xs">Editar</span>
                                    </a>
                                    <button
                                        class="px-4 py-2 rounded-md bg-red-600 flex items-center"
                                        type="button"
                                        aria-label="button to delete product"
                                        onClick={() => {
                                            sweetModal({
                                                title: "Estas seguro?",
                                                text: `Quieres eliminar esta categoría <b>${data.product.name}</b>`,
                                                icon: "danger",
                                                showCancelButton: true,
                                                confirmButtonText:
                                                    "Si, Eliminar!",
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    mutate(data.product.id, {
                                                        onSuccess: () => {
                                                            sweetModal({
                                                                icon: "success",
                                                                title: "Success",
                                                                text: `La categoría ${data.product.name} fue eliminado correctamente`,
                                                            });
                                                            history.back();
                                                        },
                                                        onError: (error) => {
                                                            sweetModal({
                                                                icon: "danger",
                                                                text: `La categoría ${
                                                                    data.product
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
                        <div class="flex flex-wrap gap-1 mt-2 flex-col">
                            <span class="text-primary dark:text-terciary font-bold">
                                Imagenes:
                            </span>
                            <div class="flex gap-2">
                                {images.map((img) => (
                                    <img
                                        src={img}
                                        width="50"
                                        height="50"
                                        class="w-[50px] h-[50px] object-cover"
                                        alt={data.product.name}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
    return component;
}

export default ProductsShow;
