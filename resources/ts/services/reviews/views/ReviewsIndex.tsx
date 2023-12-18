import VigilioTable from "~/components/table";
import { sweetModal } from "@vigilio/sweet";
import { reviewsDestroyApi } from "../apis/reviews.destroy.api";
import { useTable } from "@vigilio/preact-table";
import { reactComponent } from "~/lib/preact";
import { useMediaQueryNoReactive } from "~/hooks/useMediaQuery";
import { reviewsPaginatorApi } from "@/common/paginator/apis/reviews.paginator.api";
import reviewsColumns, {
    type ReviewsIndexMethodsPaginator,
    type ReviewsIndexSecondaryPaginator,
} from "../lib/ReviewsColumns";
import { lazy } from "preact/compat";
import Container from "@/admin/components/Container";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import { ReviewsSchemaFromServe } from "../schemas/reviews.schema";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";

const ReviewsStore = lazy(() => import("./ReviewsStore"));
const ReviewsShow = lazy(() => import("./ReviewsShow"));

function ReviewsIndex() {
    const { mutate } = reviewsDestroyApi();

    const table = useTable<
        ReviewsSchemaFromServe,
        ReviewsIndexSecondaryPaginator,
        ReviewsIndexMethodsPaginator
    >({
        columns: reviewsColumns,
        methods: { mutate } as ReviewsIndexMethodsPaginator,
    });

    const query = reviewsPaginatorApi(table);
    const handleOpenReview = (review: ReviewsSchemaFromServe) => {
        return sweetModal({
            html: reactComponent(
                <ReviewsShow params={{ id: String(review.id) }} />
            ),
            showCloseButton: true,
            position: useMediaQueryNoReactive("(min-width: 700px)")
                ? "center"
                : "start",
            sweetWidth: "800px",
        });
    };

    function onReviewsStore() {
        sweetModal({
            html: reactComponent(<ReviewsStore refetch={query.refetch} />),
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
                <AdminBreadCrumb current="Reviews" />

                <div class="">
                    {authPermissionModifierGuard() ? (
                        <button
                            type="button"
                            class="bg-primary px-6 py-3  text-white rounded-md font-bold text-xs uppercase shadow"
                            aria-label="button to open to create reviews"
                            onClick={onReviewsStore}
                        >
                            <i class="fa-solid fa-comment-dots" /> Agregar
                            Review
                        </button>
                    ) : null}
                </div>
            </div>
            <div className="overflow-auto">
                <VigilioTable query={query} table={table}>
                    <VigilioTable.header>
                        <div className="flex items-center gap-1">
                            <VigilioTable.header.limit />
                            <VigilioTable.header.refetch />
                        </div>
                        <VigilioTable.header.tools
                            hiddenInput
                            hiddenDelete={!authPermissionModifierGuard()}
                            onRemoveAll={onRemoveAll}
                        />
                    </VigilioTable.header>
                    <VigilioTable.table>
                        <VigilioTable.thead>
                            <VigilioTable.thead.row>
                                <VigilioTable.thead.th />
                            </VigilioTable.thead.row>
                        </VigilioTable.thead>
                        <VigilioTable.tbody>
                            <VigilioTable.tbody.row
                                handleClick={handleOpenReview}
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

export default ReviewsIndex;
