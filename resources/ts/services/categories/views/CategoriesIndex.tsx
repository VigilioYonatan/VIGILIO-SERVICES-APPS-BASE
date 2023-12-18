import VigilioTable from "~/components/table";
import { sweetModal } from "@vigilio/sweet";
import { categoriesDestroyApi } from "../apis/categories.destroy.api";
import { useTable } from "@vigilio/preact-table";
import { reactComponent } from "~/lib/preact";
import { useMediaQueryNoReactive } from "~/hooks/useMediaQuery";
import { categoriesPaginatorApi } from "@/common/paginator/apis/categories.paginator.api";
import categoriesColumns, {
    type CategoriesIndexMethodsPaginator,
    type CategoriesIndexSecondaryPaginator,
} from "../lib/CategoriesColumns";
import { lazy } from "preact/compat";
import Container from "@/admin/components/Container";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import { CategoriesSchemaFromServe } from "../schemas/categories.schema";

const CategoriesStore = lazy(() => import("./CategoriesStore"));
const CategoriesShow = lazy(() => import("./CategoriesShow"));

function CategoriesIndex() {
    const { mutate } = categoriesDestroyApi();

    const table = useTable<
        CategoriesSchemaFromServe,
        CategoriesIndexSecondaryPaginator,
        CategoriesIndexMethodsPaginator
    >({
        columns: categoriesColumns,
        methods: { mutate } as CategoriesIndexMethodsPaginator,
    });

    const query = categoriesPaginatorApi(table);
    const handleOpenCategory = (category: CategoriesSchemaFromServe) => {
        return sweetModal({
            html: reactComponent(
                <CategoriesShow params={{ slug: category.id }} />
            ),
            showCloseButton: true,
            position: useMediaQueryNoReactive("(min-width: 700px)")
                ? "center"
                : "start",
            sweetWidth: "800px",
        });
    };

    function onCategoriesStore() {
        sweetModal({
            html: reactComponent(<CategoriesStore refetch={query.refetch} />),
            sweetWidth: "700px",
            showCloseButton: true,
            position: useMediaQueryNoReactive("(min-width: 700px)")
                ? "center"
                : "start",
        });
    }
    function onRemoveAll(checkeds: number[]) {
        sweetModal({
            icon: "danger",
            text: `Se eliminará estas categorias con el id: ${checkeds}`,
            showCancelButton: true,
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                try {
                    await Promise.all(checkeds.map((index) => mutate(index)));
                    query.refetch();
                } catch (error) {
                    sweetModal({
                        icon: "danger",
                        title: "Hubo un error en eliminar categorías",
                        text: "Las causas de los problemas pueden ser: está siendo usado una de las categorías en otros productos",
                    });
                }
            }
        });
    }
    return (
        <Container>
            <div className="mx-1 lg:mx-6 flex flex-col gap-4">
                <AdminBreadCrumb current="categorías" />
                <div class="">
                    <button
                        type="button"
                        class="bg-primary px-6 py-3  text-white rounded-md font-bold text-xs uppercase shadow"
                        aria-label="button to open to create categories"
                        onClick={onCategoriesStore}
                    >
                        <i class="fa-solid fa-layer-group" /> Agregar categoría
                    </button>
                </div>
            </div>
            <div>
                <VigilioTable query={query} table={table}>
                    <VigilioTable.header>
                        <VigilioTable.header.tools onRemoveAll={onRemoveAll} />
                        <div className="flex items-center gap-1">
                            <VigilioTable.header.limit />
                            <VigilioTable.header.refetch />
                        </div>
                    </VigilioTable.header>
                    <VigilioTable.table>
                        <VigilioTable.thead>
                            <VigilioTable.thead.row>
                                <VigilioTable.thead.th />
                            </VigilioTable.thead.row>
                        </VigilioTable.thead>
                        <VigilioTable.tbody>
                            <VigilioTable.tbody.row
                                handleClick={handleOpenCategory}
                            >
                                {(data) => (
                                    <VigilioTable.tbody.td data={data} />
                                )}
                            </VigilioTable.tbody.row>
                        </VigilioTable.tbody>
                    </VigilioTable.table>
                    <VigilioTable.footer>
                        <div className="flex justify-center flex-col items-center gap-2">
                            <VigilioTable.footer.paginator />
                            <VigilioTable.footer.show />
                        </div>
                    </VigilioTable.footer>
                </VigilioTable>
            </div>
        </Container>
    );
}

export default CategoriesIndex;
