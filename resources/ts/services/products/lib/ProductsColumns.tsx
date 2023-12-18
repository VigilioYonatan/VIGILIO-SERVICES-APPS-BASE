import {
    type Product,
    type ProductsPaginatorQuery,
} from "@/common/paginator/apis/products.paginator.api";
import { type ProductsDestroyMutation } from "../apis/products.destroy.api";
import {
    type Columns,
    type UseTable,
    type UseTableMethods,
} from "@vigilio/preact-table";
import { formatDateTwo } from "~/lib/helpers";
import { sweetModal } from "@vigilio/sweet";
import { reactComponent } from "~/lib/preact";
import useMediaQuery from "~/hooks/useMediaQuery";
import { formatDate } from "@vigilio/express-core/helpers";
import { Link } from "wouter-preact";
import { printImagesProduct } from "./helpers";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";

export type ProductsIndexSecondaryPaginator = "acciones" | "index";
export type ProductsIndexMethodsPaginator = {
    mutate: ProductsDestroyMutation["mutate"];
    refetch: ProductsPaginatorQuery["refetch"];
} & UseTableMethods<Product, ProductsIndexSecondaryPaginator>;
export type ProductsColumnsPaginator = Columns<
    Product,
    ProductsIndexSecondaryPaginator,
    ProductsIndexMethodsPaginator
>;
export type ProductsIndexTable = UseTable<
    Product,
    ProductsIndexSecondaryPaginator,
    ProductsIndexMethodsPaginator
>;
const productsColumns: ProductsColumnsPaginator = [
    {
        key: "index",
        header: (_key, methods, data) => {
            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={!methods.isEmptyCheck()}
                        onChange={() => {
                            for (const value of data) {
                                methods.onCheck(value.id);
                            }
                        }}
                    />
                </div>
            );
        },
        cell: (props, _i, methods) => (
            <div onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={methods.existCheck(props.id)}
                    value={props.id}
                    onChange={(e) => {
                        const value = Number(
                            (e.target as HTMLInputElement).value
                        );
                        methods.onCheck(value);
                    }}
                />
            </div>
        ),
    },
    {
        key: "id",
        isSort: true,
    },
    {
        key: "name",
        header: "nombre",
        cell: (props) => `${props.name.slice(0, 12)}...`,
        isSort: true,
    },

    {
        key: "images",
        header: "imagen",
        cell: (props) => {
            const images = printImagesProduct(props.images, 300);
            return (
                <div
                    class="relative w-[60px] h-[50px] mx-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img src={images[0]} alt={props.name} />
                    {images.length > 1 ? (
                        <button
                            class="absolute top-[-10px] right-0  bg-success w-[25px] h-[25px] font-bold flex justify-center items-center rounded-full text-white"
                            aria-label="button to open images"
                            type="button"
                            onClick={() => {
                                sweetModal({
                                    html: reactComponent(
                                        <div class="flex flex-col gap-4">
                                            <span class="dark:text-white">
                                                Hay {images.length} imágenes
                                            </span>
                                            <div class="flex flex-wrap justify-center gap-5 max-w-[500px]">
                                                {images.map((img) => (
                                                    <img
                                                        src={img}
                                                        width={150}
                                                        height={150}
                                                        alt={img}
                                                        class="object-cover w-[150px] h-[150px] rounded-md"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                });
                            }}
                        >{`+ ${images.slice(1).length}`}</button>
                    ) : null}
                </div>
            );
        },
    },
    {
        key: "createdAt",
        header: "fecha de creacion",
        cell: (props) => (
            <span className="bg-blue-500 text-[10px] md:text-xs py-1 px-2 rounded-md text-white">
                <i className="far fa-calendar-alt mr-1" />
                {useMediaQuery("(min-width: 850px)")
                    ? formatDate(props.createdAt)
                    : formatDateTwo(props.createdAt)}
            </span>
        ),
        isSort: true,
    },
    {
        key: "acciones",
        cell: (props, _index, methods) => (
            <div
                class="flex items-center justify-center gap-1 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <Link to={`/products/${props.slug}`}>
                    <button
                        class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-success"
                        type="button"
                        aria-label="show user"
                    >
                        <i class="fa-solid text-sm fa-eye lg:mr-1" />
                    </button>
                </Link>
                {authPermissionModifierGuard() ? (
                    <>
                        <Link to={`/products/${props.slug}/update`}>
                            <button
                                class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-orange-600"
                                type="button"
                                aria-label="edit user"
                            >
                                <i class="fa-solid text-sm fa-pen lg:mr-1" />
                            </button>
                        </Link>
                        <button
                            class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-red-600"
                            type="button"
                            aria-label="button to delete product"
                            onClick={() => {
                                sweetModal({
                                    title: "Estas seguro?",
                                    text: `Quieres eliminar este producto: <b>${props.name}</b>`,
                                    icon: "danger",
                                    showCancelButton: true,
                                    confirmButtonText: "Si, Eliminar!",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        methods.mutate(props.id, {
                                            onSuccess: () => {
                                                sweetModal({
                                                    icon: "success",
                                                    title: "Success",
                                                    text: `el producto: ${props.name} fue eliminado correctamente`,
                                                });
                                                methods.refetch();
                                            },
                                            onError: (error) => {
                                                sweetModal({
                                                    icon: "danger",
                                                    text: `el producto: ${
                                                        props.name
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
                            <i class="fa-solid text-sm fa-trash px-1 lg:mr-1" />
                        </button>
                    </>
                ) : null}
            </div>
        ),
    },
];
export default productsColumns;
