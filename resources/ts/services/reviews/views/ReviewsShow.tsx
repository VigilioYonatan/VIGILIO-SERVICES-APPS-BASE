import { formatDate } from "@vigilio/express-core/helpers";
import { reviewsShowApi } from "../apis/reviews.show.api";
import { sweetModal } from "@vigilio/sweet";
import { reviewsDestroyApi } from "../apis/reviews.destroy.api";
import View404 from "@/admin/views/404";
import Loading from "@/admin/components/Loading";
import { printFotoReviews } from "../lib/helpers";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";
interface ReviewsShowProps {
    params: { id?: string };
}
function ReviewsShow({ params: { id } }: ReviewsShowProps) {
    const { mutate } = reviewsDestroyApi();

    const { data, isSuccess, isLoading, isError } = reviewsShowApi(
        id as string
    );
    let component = null;

    if (isLoading) {
        component = <Loading />;
    }
    if (isError) {
        component = <View404 message={`No se encontró una review ${id}`} />;
    }
    if (isSuccess && data) {
        const review = data.review;
        const images = printFotoReviews(review.foto, 100);

        component = (
            <div class="p-4">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "reviews", uri: "/reviews" }]}
                        current={String(review.id)}
                    />
                </div>
                <div className="flex gap-4 flex-col text-start p-4">
                    <img
                        src={images[0]}
                        class="rounded-md mb-5 w-[150px] h-[150px] object-cover  mx-auto"
                        width="150"
                        height="150"
                        alt={review.name}
                    />
                    <div className="flex gap-4 flex-wrap justify-center  font-semibold">
                        <div className="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    ID:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {review.id}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Nombre:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {review.name}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Apellido:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {review.lastname || "no se ingresó"}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[250px]">
                            <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    reseña:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {review.review}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3  p-2 rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Creado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(review.createdAt)}
                                </span>
                            </div>
                            <div class="flex gap-1 flex-col mb-3 p-2 bg-paper-light dark:bg-admin-terciary rounded-md">
                                <span class="text-primary dark:text-terciary font-bold">
                                    Actualizado:
                                </span>
                                <span class="dark:text-secondary-light text-secondary-dark tracking-wide">
                                    {formatDate(review.updatedAt)}
                                </span>
                            </div>
                            {authPermissionModifierGuard() ? (
                                <div class="flex gap-1 flex-col mb-3 bg-paper-light dark:bg-admin-terciary p-2 rounded-md">
                                    <span class="text-primary dark:text-terciary font-bold">
                                        Acciones:
                                    </span>
                                    <div class="flex items-center gap-1 text-white">
                                        <a
                                            class="px-4 py-2 gap-2 flex items-center rounded-md bg-blue-600"
                                            href={`/admin/reviews/${review.id}/edit`}
                                        >
                                            <i class="fa-solid text-sm fa-pen lg:mr-1" />
                                            <span class="text-xs">Editar</span>
                                        </a>
                                        <button
                                            class="px-4 py-2 rounded-md bg-red-600 flex items-center"
                                            type="button"
                                            aria-label="button to delete review"
                                            onClick={() => {
                                                sweetModal({
                                                    title: "Estas seguro?",
                                                    text: `Quieres eliminar este review <b>${review.id}</b>`,
                                                    icon: "danger",
                                                    showCancelButton: true,
                                                    confirmButtonText:
                                                        "Si, Eliminar!",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        mutate(review.id, {
                                                            onSuccess: () => {
                                                                sweetModal({
                                                                    icon: "success",
                                                                    title: "Success",
                                                                    text: `El review ${review.id} fue eliminado correctamente`,
                                                                });
                                                                history.back();
                                                            },
                                                            onError: (
                                                                error
                                                            ) => {
                                                                sweetModal({
                                                                    icon: "danger",
                                                                    text: `El review ${
                                                                        review.id
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
                                            <span class="text-xs">
                                                Eliminar
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return component;
}

export default ReviewsShow;
