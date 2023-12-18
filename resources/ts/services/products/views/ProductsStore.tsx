import Form from "~/components/form";
import {
    type ProductsStoreDto,
    productsStoreDto,
} from "../dtos/products.store.dto";
import { slug as transformSlug } from "@vigilio/express-core/helpers";
import { useForm } from "react-hook-form";
import { productsStoreApi } from "../apis/products.store.api";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect, useMemo } from "preact/hooks";
import { categoriesIndexApi } from "@/categories/apis/categories.index.api";
interface ProductsStoreProps {
    refetch: (clean?: boolean | undefined) => Promise<void>;
}
function ProductsStore({ refetch }: ProductsStoreProps) {
    const productsStoreDtoForm = useForm<ProductsStoreDto>({
        resolver: valibotResolver(productsStoreDto),
        mode: "all",
    });
    const { mutate, isLoading } = productsStoreApi();
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

    const onAddCategory = (data: ProductsStoreDto) => {
        mutate(data, {
            onSuccess(data) {
                productsStoreDtoForm.reset();
                sweetModal({
                    icon: "success",
                    text: `<p class="text-center">Nuevo producto insertado correctamente <b>${data.product.name}</b></p>`,
                });
                refetch();
            },
            onError(error) {
                if (error?.body) {
                    productsStoreDtoForm.setError(
                        error.body as keyof ProductsStoreDto,
                        {
                            message: error.message,
                        }
                    );
                    productsStoreDtoForm.resetField(
                        error.body as keyof ProductsStoreDto,
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
    const name = productsStoreDtoForm.watch("name");
    const ilimit = productsStoreDtoForm.watch("ilimit");
    const enabled = productsStoreDtoForm.watch("enabled");
    const discount = productsStoreDtoForm.watch("discount");
    const price = productsStoreDtoForm.watch("price");

    useEffect(() => {
        if (name) {
            productsStoreDtoForm.setValue("slug", transformSlug(name || ""), {
                shouldValidate: true,
            });
        }
    }, [name]);
    useEffect(() => {
        if (ilimit) {
            productsStoreDtoForm.setValue(
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
            productsStoreDtoForm.setValue(
                "enabled",
                JSON.parse(enabled as unknown as string),
                {
                    shouldValidate: true,
                }
            );
        }
    }, [enabled]);

    const subtotal = useMemo(
        () => (price - ((discount || 0) / 100) * price || 0).toFixed(2),
        [discount, price]
    );

    return (
        <div class="text-start  mt-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                    <i class="fas fa-hamburger" />
                    Agregar Producto
                </h3>
            </div>
            <Form {...productsStoreDtoForm} onSubmit={onAddCategory}>
                <div class="flex justify-end items-center mb-4">
                    <Form.button.reset />
                </div>

                <div class="flex gap-3 flex-col lg:flex-row">
                    <div class="w-full lg:w-1/2">
                        <div class="w-full flex flex-row gap-2">
                            <Form.control
                                name={"name" as keyof ProductsStoreDto}
                                title="Nombre"
                                placeholder="Nombre de categoria"
                            />
                            <Form.control
                                name={"slug" as keyof ProductsStoreDto}
                                title="Slug"
                                placeholder="nombre-de-producto"
                                options={{ setValueAs: transformSlug }}
                                disabled
                            />
                        </div>
                        <div class="w-full flex flex-row gap-2">
                            <Form.control
                                name={"price" as keyof ProductsStoreDto}
                                type="number"
                                title="Precio"
                                placeholder="S/. 10.00"
                                options={{ setValueAs: Number }}
                            />
                            <div class="w-full flex items-center gap-2">
                                <Form.control
                                    name={"discount" as keyof ProductsStoreDto}
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
                                name={"ilimit" as keyof ProductsStoreDto}
                                title="Ilimitado"
                                placeholder="Limite de cantidad de producto"
                                array={[
                                    { key: true, value: "Verdadero" },
                                    { key: false, value: "Falso" },
                                ]}
                            />
                            {!ilimit ? (
                                <Form.control
                                    name={"stock" as keyof ProductsStoreDto}
                                    type="number"
                                    title="Cantidad"
                                    placeholder="Cantidad de products"
                                    options={{ setValueAs: Number }}
                                />
                            ) : null}
                        </div>
                        <div class="w-full flex flex-row gap-2">
                            <Form.control.select
                                name={"category_id" as keyof ProductsStoreDto}
                                title="Categoría"
                                placeholder="Escoge categoría"
                                array={categoriesSelect}
                                options={{ valueAsNumber: true }}
                            />
                            <Form.control.select
                                name={"enabled" as keyof ProductsStoreDto}
                                title="Habilitar"
                                placeholder="Escoger opción"
                                array={[
                                    { key: true, value: "Habilitar" },
                                    { key: false, value: "Deshabilitar" },
                                ]}
                            />
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2">
                        <Form.control.area
                            name={"description" as keyof ProductsStoreDto}
                            title="Descripción"
                            placeholder="Descripcion del producto"
                        />
                        <Form.control.file
                            name={"images" as keyof ProductsStoreDto}
                            accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                            title="Imagenes"
                            typeFile="image"
                            multiple
                        />
                    </div>
                </div>
                <div class="flex justify-center">
                    <Form.button.submit
                        isLoading={isLoading || false}
                        title="Guardar"
                    />
                </div>
            </Form>
        </div>
    );
}

export default ProductsStore;
