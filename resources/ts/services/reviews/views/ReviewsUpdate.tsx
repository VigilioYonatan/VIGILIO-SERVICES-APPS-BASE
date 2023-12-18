import { useForm } from "react-hook-form";
import {
    type ReviewsUpdateDto,
    reviewsUpdateDto,
} from "../dtos/reviews.update.dto";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { reviewsUpdateApi } from "../apis/reviews.update.api";
import { sweetModal } from "@vigilio/sweet";
import { useMemo } from "preact/hooks";
import { slug as transformSlug } from "@vigilio/express-core/helpers";
import Form from "~/components/form";
import { reviewsShowApi } from "../apis/reviews.show.api";
import Loading from "@/admin/components/Loading";
import View404 from "@/admin/views/404";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";

interface ReviewsUpdateProps {
    params: { id?: string };
}
function ReviewsUpdate({ params: { id } }: ReviewsUpdateProps) {
    if (!authPermissionModifierGuard()) {
        window.history.back();
        return null;
    }
    const query = reviewsShowApi(id as string);

    const { mutate, isLoading } = reviewsUpdateApi();
    let component = null;

    if (query.isLoading) {
        component = <Loading />;
    }
    if (query.isError) {
        component = <View404 message={`No se encontró un review ${id}`} />;
    }
    if (query.isSuccess && query.data) {
        const review = query.data.review;
        const formReviewsUpdate = useForm<ReviewsUpdateDto>({
            resolver: valibotResolver(reviewsUpdateDto),
            mode: "all",
            values: useMemo(() => review, []),
        });
        const onUpdateCategory = (data: ReviewsUpdateDto) => {
            mutate(data, {
                onSuccess(data) {
                    formReviewsUpdate.reset();
                    sweetModal({
                        icon: "success",
                        text: `<p class="text-center">Review editado correctamente <b>${data.review.id}</b></p>`,
                    });
                    query.refetch();
                },
                onError(error) {
                    if (error?.body) {
                        formReviewsUpdate.setError(
                            error.body as keyof ReviewsUpdateDto,
                            { message: error.message }
                        );
                        formReviewsUpdate.resetField(error.body, {
                            keepError: true,
                        });

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

        component = (
            <div class="p-4">
                <div className="mx-1 lg:mx-6 flex flex-col gap-4 self-start mb-4">
                    <AdminBreadCrumb
                        uris={[{ title: "reviews", uri: "/reviews" }]}
                        current={String(review.id)}
                    />
                </div>
                <div class="max-w-[800px] dark:bg-admin-paper-dark p-4 rounded-md">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                            <i class="fa-solid fa-layer-group" />
                            Editar Review - {review.id}
                        </h3>
                    </div>
                    <div className="flex flex-col  gap-4">
                        <Form
                            {...formReviewsUpdate}
                            onSubmit={onUpdateCategory}
                        >
                            <div class="flex flex-col gap-4 justify-center items-center">
                                <div class="w-full flex flex-col md:flex-row gap-2">
                                    <Form.control
                                        name={"name" as keyof ReviewsUpdateDto}
                                        title="Nombre"
                                        placeholder="Nombre de review"
                                    />

                                    <Form.control
                                        name={"icon" as keyof ReviewsUpdateDto}
                                        title="Icono"
                                        type="text"
                                        placeholder="<i class='fa-solid fa-brush'></i>"
                                        question={
                                            <p>
                                                Busque un icono{" "}
                                                <a
                                                    class="font-bold underline"
                                                    href="https://fontawesome.com/search"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Aquí
                                                </a>{" "}
                                                y copie y pegue
                                            </p>
                                        }
                                    />
                                </div>
                                <div class="w-full flex flex-col md:flex-row gap-2">
                                    <Form.control
                                        name={"slug" as keyof ReviewsUpdateDto}
                                        title="Slug"
                                        placeholder="nombre-de-categoria"
                                        options={{ setValueAs: transformSlug }}
                                    />
                                </div>
                                <Form.button.submit
                                    isLoading={isLoading || false}
                                    title="Editar"
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    return component;
}

export default ReviewsUpdate;
