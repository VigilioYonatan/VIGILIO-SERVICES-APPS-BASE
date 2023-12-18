import Form from "~/components/form";
import {
    type ReviewsStoreDto,
    reviewsStoreDto,
} from "../dtos/reviews.store.dto";
import { useForm } from "react-hook-form";
import { reviewsStoreApi } from "../apis/reviews.store.api";
import { sweetModal } from "@vigilio/sweet";
import { valibotVigilio } from "~/lib/valibot";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";
interface ReviewsStoreProps {
    refetch: (clean?: boolean | undefined) => Promise<void>;
}
function ReviewsStore({ refetch }: ReviewsStoreProps) {
    if (!authPermissionModifierGuard()) {
        window.history.back();
        return null;
    }
    const reviewsStoreDtoForm = useForm<ReviewsStoreDto>({
        resolver: valibotVigilio(reviewsStoreDto),
        mode: "all",
        defaultValues: { star: 0 },
    });
    const reviewsStoreMutation = reviewsStoreApi();
    const onAddReview = (data: ReviewsStoreDto) => {
        reviewsStoreMutation.mutate(data, {
            onSuccess(data) {
                reviewsStoreDtoForm.reset();
                sweetModal({
                    icon: "success",
                    text: `<p class="text-center">Nueva review insertado correctamente <b>${data.review.id}</b></p>`,
                });
                refetch();
            },
            onError(error) {
                if (error?.body) {
                    reviewsStoreDtoForm.setError(
                        error.body as keyof ReviewsStoreDto,
                        {
                            message: error.message,
                        }
                    );
                    reviewsStoreDtoForm.resetField(error.body, {
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
    return (
        <div className="text-start  mt-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="dark:text-white text-2xl font-bold uppercase text-center flex gap-2">
                    <i class="fa-solid fa-comment-dots" />
                    Agregar Review
                </h3>
            </div>
            <Form {...reviewsStoreDtoForm} onSubmit={onAddReview}>
                <div class="flex justify-end items-center mb-4">
                    <Form.button.reset />
                </div>
                <div class="flex flex-col gap-4 justify-center items-center">
                    <div class="w-full flex flex-col sm:flex-row gap-2">
                        <Form.control
                            name={"name" as keyof ReviewsStoreDto}
                            title="Nombre"
                            ico={<i class="fas fa-user" />}
                        />
                        <Form.control
                            name={"lastname" as keyof ReviewsStoreDto}
                            title="Apellido"
                            question="Este campo no es obligatorio"
                        />
                    </div>
                    <Form.control.area
                        name={"review" as keyof ReviewsStoreDto}
                        title="Review"
                    />

                    <Form.control.star
                        name={"star" as keyof ReviewsStoreDto}
                        title="Rating"
                    />
                    <Form.control.file
                        name={"foto" as keyof ReviewsStoreDto}
                        title="Foto"
                        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                        typeFile="image"
                        typesText="No es obligatorio: JPG, JPEG, WEBP, PNG, GIF"
                    />
                    <Form.button.submit
                        isLoading={reviewsStoreMutation.isLoading || false}
                        title="Guardar"
                    />
                </div>
            </Form>
        </div>
    );
}

export default ReviewsStore;
