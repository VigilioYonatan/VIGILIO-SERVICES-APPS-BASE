import { ReviewsSchemaFromServe } from "../schemas/reviews.schema";
import { ReviewsStoreDto } from "../dtos/reviews.store.dto";
import { UseMutation, useMutation } from "@vigilio/preact-fetching";
import enviroments from "~/config";

export const reviewsStoreUploadImage = "/uploads/reviews/foto";

export function reviewsStoreApi(): UseMutation<
    ReviewsStoreAPI,
    ReviewsStoreDto,
    ReviewsStoreErrorAPI
> {
    return useMutation("/reviews", async function (url, body) {
        let foto = null;
        if (body.foto) {
            const formData = new FormData();
            for (const file of body.foto) {
                formData.append("file", file);
            }
            const responseImage = await fetch(
                `${enviroments.VITE_URL}/api${reviewsStoreUploadImage}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const resultImage = await responseImage.json();

            if (!resultImage.success) throw resultImage;
            foto = resultImage.images;
        }

        const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
            body: JSON.stringify({
                ...body,
                foto,
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response.json();

        if (!result.success) throw result;
        return result;
    });
}
export interface ReviewsStoreErrorAPI {
    body: keyof ReviewsStoreDto;
    message: string;
    success: false;
}

export interface ReviewsStoreAPI {
    success: boolean;
    review: ReviewsSchemaFromServe;
}
