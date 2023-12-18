import enviroments from "~/config";
import { UseMutation, useMutation } from "@vigilio/preact-fetching";
import {
    ReviewsUpdateDto,
    ReviewsUpdateImageDto,
} from "../dtos/reviews.update.dto";
import { ReviewsSchemaFromServe } from "../schemas/reviews.schema";
import { reviewsStoreUploadImage } from "./reviews.store.api";

export function reviewsUpdateApi(): UseMutation<
    ReviewsUpdateAPI,
    ReviewsUpdateDto,
    reviewsUpdateErrorAPI
> {
    return useMutation("/reviews", async function (url, body) {
        const response = await fetch(`${enviroments.VITE_URL}/api/${url}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export function reviewsUpdateImageApi(
    slug: string | number
): UseMutation<
    ReviewsUpdateImageAPI,
    ReviewsUpdateImageDto,
    reviewsUpdateErrorAPI
> {
    return useMutation(
        `${reviewsStoreUploadImage}/${slug}`,
        async function (url, body) {
            const formData = new FormData();
            if (body.foto) {
                for (const file of body.foto) {
                    formData.append("file", file);
                }
            }
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
                method: "PATCH",
                body: formData,
            });
            const result = await response.json();
            if (!result.success) throw result;
            return result;
        }
    );
}
export interface ReviewsUpdateImageAPI {
    success: boolean;
    message: string;
}
export interface ReviewsUpdateAPI {
    success: boolean;
    review: ReviewsSchemaFromServe;
}
export interface reviewsUpdateErrorAPI {
    success: boolean;
    message: string;
    body: keyof ReviewsUpdateDto;
}
