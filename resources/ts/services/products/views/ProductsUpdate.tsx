import { useForm } from "react-hook-form";
import {
    type ProductsUpdateDto,
    productsUpdateDto,
    productsUpdateImagesDto,
    ProductsUpdateImagesDto,
} from "../dtos/products.update.dto";
import {
    productsUpdateApi,
    productsUpdateImagesApi,
} from "../apis/products.update.api";
import { sweetModal } from "@vigilio/sweet";
import { useEffect, useMemo } from "preact/hooks";
import { slug as transformSlug } from "@vigilio/express-core/helpers";
import { ProductsShowAPI, productsShowApi } from "../apis/products.show.api";
import Form from "~/components/form";
import Loading from "@/admin/components/Loading";
import View404 from "@/admin/views/404";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import { valibotVigilio } from "~/lib/valibot";
import { printImagesProduct } from "../lib/helpers";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";
import AdminHr from "~/components/AdminHr";
import { JSX } from "preact/jsx-runtime";
import { categoriesIndexApi } from "@/categories/apis/categories.index.api";

interface ProductsUpdateProps {
    params: { slug?: string | number };
}
function ProductsUpdate({ params: { slug } }: ProductsUpdateProps) {
    if (!authPermissionModifierGuard()) {
        window.history.back();
        return null;
    }
    const query = productsShowApi(slug as string);

    let component: JSX.Element | JSX.Element[] | null = null;

    if (query.isLoading) {
        component = <Loading />;
    }
    if (query.isError) {
        component = <View404 message={`No se encontró un producto: ${slug}`} />;
    }
    if (query.isSuccess && query.data) {
        const product = query.data.product as ProductsShowAPI["product"];
        const formProductsUpdate = useForm<ProductsUpdateDto>({
            resolver: valibotVigilio(productsUpdateDto),
            mode: "all",
            values: useMemo(() => {
                const {
                    createdAt,
                    updatedAt,
                    images,
                    id,
                    categories,
                    ...rest
                } = product;

                return {
                    ...rest,
                    price: Number(rest.price),
                    discount: Number(rest.discount),
                };
            }, []),
        });
        const formProductsUpdateImages = useForm<ProductsUpdateImagesDto>({
            mode: "all",
            resolver: valibotVigilio(productsUpdateImagesDto),
        });

        async function initial() {
            const response = await fetch(printImagesProduct(product.images)[0]);
            const result = await response.blob();
            const nuevoArchivo = new File([result], product.images[0].file, {
                type: "image/webp",
            });
            formProductsUpdateImages.setValue("images", [nuevoArchivo]);
        }

        useEffect(() => {
            initial();
        }, []);

        const mutateProductsUpdateApi = productsUpdateApi(product.id);
        const mutateProductsUpdateImagesApi = productsUpdateImagesApi(
            product.id
        );

        const onUpdateProduct = (data: ProductsUpdateDto) => {
            mutateProductsUpdateApi.mutate(data, {
                onSuccess(data) {
                    sweetModal({
                        icon: "success",
                        text: `<p class="text-center">Producto actualizado correctamente <b>${data.product.name}</b></p>`,
                    });
                },
                onError(error) {
                    if (error?.body) {
                        formProductsUpdate.setError(
                            error.body as keyof ProductsUpdateDto,
                            {
                                message: error.message,
                            }
                        );
                        formProductsUpdate.resetField(
                            error.body as keyof ProductsUpdateDto,
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
        const onUpdateImagesProduct = (data: ProductsUpdateImagesDto) => {
            mutateProductsUpdateImagesApi.mutate(
                { ...data, name: product.name },
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
        // categories
        const categoriesQuery = categoriesIndexApi();

        const categoriesSelect = useMemo(() => {
            if (categoriesQuery.isSuccess && categoriesQuery.data) {
                return categoriesQuery.data.data.map((value) => ({
                    key: value.id,
                    value: value.name,
                }));
            }
            return [];
        }, [categoriesQuery.data, categoriesQuery.isSuccess]);
        const name = formProductsUpdate.watch("name");
        const ilimit = formProductsUpdate.watch("ilimit");
        const enabled = formProductsUpdate.watch("enabled");
        const discount = formProductsUpdate.watch("discount");
        const price = formProductsUpdate.watch("price");

        useEffect(() => {
            formProductsUpdate.setValue("slug", transformSlug(name || ""), {
                shouldValidate: true,
            });
        }, [name]);
        useEffect(() => {
            if (ilimit) {
                formProductsUpdate.setValue(
                    "ilimit",
                    JSON.parse(ilimit as unknown as string),
                    {
                        shouldValidate: true,
                    }
                );
            }
        }, [ilimit]);
        useEffect(() => {
            if (enabled) {
                formProductsUpdate.setValue(
                    "enabled",
                    JSON.parse(enabled as unknown as string),
                    {
                        shouldValidate: true,
                    }
                );
            }
        }, [enabled]);
        async function initialUpdateImages() {
            const response = await Promise.all(
                printImagesProduct(product.images).map((file) => {
                    return fetch(file);
                })
            );

            const result = await Promise.all(response.map((req) => req.blob()));

            const images = result.map(
                (res, i) =>
                    new File([res], product.images[i].file, {
                        type: "image/webp",
                    })
            );
            formProductsUpdateImages.setValue("images", images);
        }

        useEffect(() => {
            initialUpdateImages();
        }, []);
        const subtotal = useMemo(
            () => (price - ((discount || 0) / 100) * price || 0).toFixed(2),
            [discount, price]
        );
        component = (
            <div class="p-4 bg-background-light dark:bg-admin-background-dark shadow">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "productos", uri: "/products" }]}
                        current={query.data.product.name}
                    />
                </div>
                <div class="max-w-[800px] dark:bg-admin-paper-dark p-4 rounded-md">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                            <i class="fa-solid fa-products" />
                            Editar Producto - {query.data.product.name}
                        </h3>
                    </div>
                    <Form {...formProductsUpdate} onSubmit={onUpdateProduct}>
                        <div class="flex justify-end items-center mb-4">
                            <Form.button.reset />
                        </div>

                        <div class="w-full">
                            <div class="w-full flex flex-row gap-2">
                                <Form.control
                                    name={"name" as keyof ProductsUpdateDto}
                                    title="Nombre"
                                    placeholder="Nombre de categoria"
                                />
                                <Form.control
                                    name={"slug" as keyof ProductsUpdateDto}
                                    title="Slug"
                                    placeholder="nombre-de-producto"
                                    options={{ setValueAs: transformSlug }}
                                    disabled
                                />
                            </div>
                            <div class="w-full flex flex-row gap-2">
                                <Form.control
                                    name={"price" as keyof ProductsUpdateDto}
                                    type="number"
                                    title="Precio"
                                    placeholder="S/. 10.00"
                                    options={{ setValueAs: Number }}
                                />
                                <div class="w-full flex items-center gap-2">
                                    <Form.control
                                        name={
                                            "discount" as keyof ProductsUpdateDto
                                        }
                                        type="number"
                                        title="Descuento"
                                        placeholder="0%"
                                        options={{ setValueAs: Number }}
                                    />
                                    <span class="text-xs whitespace-nowrap">
                                        S/. {subtotal}
                                    </span>
                                </div>
                            </div>
                            <div class="w-full flex flex-row gap-2">
                                <Form.control.select
                                    name={"ilimit" as keyof ProductsUpdateDto}
                                    title="Ilimitado"
                                    placeholder="Limite de cantidad de producto"
                                    array={[
                                        { key: true, value: "Verdadero" },
                                        { key: false, value: "Falso" },
                                    ]}
                                />
                                {!ilimit ? (
                                    <Form.control
                                        name={
                                            "stock" as keyof ProductsUpdateDto
                                        }
                                        type="number"
                                        title="Cantidad"
                                        placeholder="Cantidad de products"
                                        options={{ setValueAs: Number }}
                                    />
                                ) : null}
                            </div>
                            <div class="w-full flex flex-row gap-2">
                                <Form.control.select
                                    name={
                                        "category_id" as keyof ProductsUpdateDto
                                    }
                                    title="Categoría"
                                    placeholder="Escoge categoría"
                                    array={categoriesSelect}
                                    options={{ valueAsNumber: true }}
                                />
                                <Form.control.select
                                    name={"enabled" as keyof ProductsUpdateDto}
                                    title="Habilitar"
                                    placeholder="Escoger opción"
                                    array={[
                                        { key: true, value: "Habilitar" },
                                        {
                                            key: false,
                                            value: "Deshabilitar",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <Form.control.area
                            name={"description" as keyof ProductsUpdateDto}
                            title="Descripción"
                            placeholder="Descripcion del producto"
                        />
                        <div class="flex justify-center">
                            <Form.button.submit
                                isLoading={
                                    mutateProductsUpdateApi.isLoading || false
                                }
                                title="Guardar"
                            />
                        </div>
                    </Form>
                    <AdminHr />
                    <div class="flex justify-between items-center">
                        <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                            <i class="fa-solid fa-image" />
                            Editar images - {query.data.product.name}
                        </h3>
                    </div>
                    <Form
                        {...formProductsUpdateImages}
                        onSubmit={onUpdateImagesProduct}
                    >
                        <Form.control.file
                            name={"images" as keyof ProductsUpdateImagesDto}
                            title="Images de perfil"
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                            typeFile="image"
                        />
                        <div class="flex justify-center">
                            <Form.button.submit
                                isLoading={
                                    mutateProductsUpdateImagesApi.isLoading ||
                                    false
                                }
                                ico={<i class="fas fa-pen" />}
                                title="Editar"
                            />
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

    return component;
}

export default ProductsUpdate;
