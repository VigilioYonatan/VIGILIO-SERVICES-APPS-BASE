import VigilioTable from "~/components/table";
import { sweetModal } from "@vigilio/sweet";
import { productsDestroyApi } from "../apis/products.destroy.api";
import { useTable } from "@vigilio/preact-table";
import { reactComponent } from "~/lib/preact";
import { useMediaQueryNoReactive } from "~/hooks/useMediaQuery";
import {
    type Product,
    productsPaginatorApi,
} from "@/common/paginator/apis/products.paginator.api";
import productsColumns, {
    type ProductsIndexMethodsPaginator,
    type ProductsIndexSecondaryPaginator,
} from "../lib/ProductsColumns";
import { lazy } from "preact/compat";
import Container from "@/admin/components/Container";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";

/* lazy components */
const ProductsShow = lazy(() => import("./ProductsShow"));
const ProductsStore = lazy(() => import("./ProductsStore"));

function ProductsIndex() {
    const { mutate } = productsDestroyApi();

    const table = useTable<
        Product,
        ProductsIndexSecondaryPaginator,
        ProductsIndexMethodsPaginator
    >({
        columns: productsColumns,
        methods: { mutate } as ProductsIndexMethodsPaginator,
    });

    const query = productsPaginatorApi(table);
    const handleOpenProduct = (product: Product) => {
        return sweetModal({
            html: reactComponent(
                <ProductsShow params={{ slug: product.id }} />
            ),
            showCloseButton: true,
            position: useMediaQueryNoReactive("(min-width: 700px)")
                ? "center"
                : "start",
            sweetWidth: "800px",
        });
    };

    function onProductsStore() {
        sweetModal({
            html: reactComponent(<ProductsStore refetch={query.refetch} />),
            sweetWidth: "1000px",
            showCloseButton: true,
            position: useMediaQueryNoReactive("(min-width: 700px)")
                ? "center"
                : "start",
        });
    }
    function onRemoveAll(checkeds: number[]) {
        sweetModal({
            icon: "danger",
            text: `Se eliminará estos productos con los id: ${checkeds}`,
            showCancelButton: true,
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                await Promise.all(checkeds.map((index) => mutate(index)));
                query.refetch();
            }
        });
    }
    return (
        <Container>
            <div className="mx-1 lg:mx-6 flex flex-col gap-4">
                <AdminBreadCrumb current="productos" />
                <div class="">
                    <button
                        type="button"
                        class="bg-primary px-6 py-3  text-white rounded-md font-bold text-xs uppercase shadow"
                        aria-label="button to open to create products"
                        onClick={onProductsStore}
                    >
                        Agregar
                    </button>
                </div>
            </div>
            <div class="overflow-auto">
                <VigilioTable query={query} table={table}>
                    <VigilioTable.header>
                        <VigilioTable.header.tools onRemoveAll={onRemoveAll} />
                        <div class="flex items-center gap-1">
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
                                handleClick={handleOpenProduct}
                            >
                                {(data) => (
                                    <VigilioTable.tbody.td data={data} />
                                )}
                            </VigilioTable.tbody.row>
                        </VigilioTable.tbody>
                    </VigilioTable.table>
                    <VigilioTable.footer>
                        <VigilioTable.footer.paginator />
                        <VigilioTable.footer.show />
                    </VigilioTable.footer>
                </VigilioTable>
            </div>
        </Container>
    );
}

export default ProductsIndex;
