import { type ReviewsPaginatorQuery } from "@/common/paginator/apis/reviews.paginator.api";
import { type ReviewsDestroyMutation } from "../apis/reviews.destroy.api";
import {
    type Columns,
    type UseTable,
    type UseTableMethods,
} from "@vigilio/preact-table";
import { sweetModal } from "@vigilio/sweet";
import { Link } from "wouter-preact";
import { printFotoReviews } from "./helpers";
import { type ReviewsSchemaFromServe } from "../schemas/reviews.schema";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";
import { printFileUser } from "@/users/lib/helpers";

export type ReviewsIndexSecondaryPaginator = "acciones" | "index";
export type ReviewsIndexMethodsPaginator = {
    mutate: ReviewsDestroyMutation["mutate"];
    refetch: ReviewsPaginatorQuery["refetch"];
} & UseTableMethods<ReviewsSchemaFromServe, ReviewsIndexSecondaryPaginator>;
export type ReviewsColumnsPaginator = Columns<
    ReviewsSchemaFromServe,
    ReviewsIndexSecondaryPaginator,
    ReviewsIndexMethodsPaginator
>;
export type ReviewsIndexTable = UseTable<
    ReviewsSchemaFromServe,
    ReviewsIndexSecondaryPaginator,
    ReviewsIndexMethodsPaginator
>;
const reviewsColumns: ReviewsColumnsPaginator = [
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
        key: "review",
        header: "Reseña",
        cell: (props) => `${props.review.slice(0, 12)}...`,
    },
    {
        key: "foto",
        header: "Foto",
        cell: (props) => {
            return (
                <img
                    width={80}
                    height={80}
                    class="min-w-[50px] max-w-[50px] h-[50px] rounded-sm mx-auto object-cover"
                    src={
                        props.user_id
                            ? printFileUser(props.user.foto, 300)[0]
                            : printFotoReviews(props.foto)[0]
                    }
                    alt={props.name}
                />
            );
        },
    },
    {
        key: "acciones",
        cell: (props, _index, methods) => (
            <div
                class="flex items-center justify-center gap-1 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <Link to={`/reviews/${props.id}`}>
                    <button
                        class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-success"
                        type="button"
                        aria-label="show review"
                    >
                        <i class="fa-solid text-sm fa-eye lg:mr-1" />
                    </button>
                </Link>
                {authPermissionModifierGuard() ? (
                    <>
                        <Link to={`/reviews/${props.id}/update`}>
                            <button
                                class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-orange-600"
                                type="button"
                                aria-label="edit review"
                            >
                                <i class="fa-solid text-sm fa-pen lg:mr-1" />
                            </button>
                        </Link>
                        <button
                            class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-red-600"
                            type="button"
                            aria-label="button to delete review"
                            onClick={() => {
                                sweetModal({
                                    title: "Estas seguro?",
                                    text: `Quieres eliminar este review: <b>${props.id}</b>`,
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
                                                    text: `El review: ${props.id} fue eliminado correctamente`,
                                                });
                                                methods.refetch();
                                            },
                                            onError: (error) => {
                                                sweetModal({
                                                    icon: "danger",
                                                    text: `El review: ${
                                                        props.id
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
export default reviewsColumns;
