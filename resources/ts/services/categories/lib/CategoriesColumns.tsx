import { type CategoriesPaginatorQuery } from "@/common/paginator/apis/categories.paginator.api";
import { type CategoriesDestroyMutation } from "../apis/categories.destroy.api";
import {
    type Columns,
    type UseTable,
    type UseTableMethods,
} from "@vigilio/preact-table";
import { sweetModal } from "@vigilio/sweet";
import { reactComponent } from "~/lib/preact";
import { Link } from "wouter-preact";
import { printImagesCategories } from "./helpers";
import { type CategoriesSchemaFromServe } from "../schemas/categories.schema";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";

export type CategoriesIndexSecondaryPaginator = "acciones" | "index";
export type CategoriesIndexMethodsPaginator = {
    mutate: CategoriesDestroyMutation["mutate"];
    refetch: CategoriesPaginatorQuery["refetch"];
} & UseTableMethods<
    CategoriesSchemaFromServe,
    CategoriesIndexSecondaryPaginator
>;
export type CategoriesColumnsPaginator = Columns<
    CategoriesSchemaFromServe,
    CategoriesIndexSecondaryPaginator,
    CategoriesIndexMethodsPaginator
>;
export type CategoriesIndexTable = UseTable<
    CategoriesSchemaFromServe,
    CategoriesIndexSecondaryPaginator,
    CategoriesIndexMethodsPaginator
>;
const categoriesColumns: CategoriesColumnsPaginator = [
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
        cell: (_props, index) => index + 1,
        isSort: true,
    },
    {
        key: "name",
        header: "nombre",
        cell: (props) => `${props.name.slice(0, 12)}...`,
        isSort: true,
    },
    {
        key: "icon",
        header: "icono",
        cell(props) {
            return (
                <div
                    className="text-xl"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                    dangerouslySetInnerHTML={{ __html: props.icon }}
                />
            );
        },
    },
    {
        key: "image",
        header: "imagen",
        cell: (props) => {
            const images = printImagesCategories(props.image, 500);
            return (
                <div class="relative w-[60px] h-[50px] mx-auto">
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
                                            <h1>xd</h1>
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
        key: "acciones",
        cell: (props, _index) => (
            <div
                class="flex items-center justify-center gap-1 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <Link to={`/categories/${props.slug}`}>
                    <button
                        class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-success"
                        type="button"
                        aria-label="show category"
                    >
                        <i class="fa-solid text-sm fa-eye lg:mr-1" />
                    </button>
                </Link>
                {authPermissionModifierGuard() ? (
                    <Link to={`/categories/${props.slug}/update`}>
                        <button
                            class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-orange-600"
                            type="button"
                            aria-label="edit category"
                        >
                            <i class="fa-solid text-sm fa-pen lg:mr-1" />
                        </button>
                    </Link>
                ) : null}
            </div>
        ),
    },
];
export default categoriesColumns;
