import enviroments from "~/config";
import { UseQuery, useQuery } from "@vigilio/preact-fetching";
import { ReviewsSchemaFromServe } from "../schemas/reviews.schema";

export function reviewsShowApi(
    id: number | string
): UseQuery<ReviewsShowAPI, ReviewsShowErrorAPI> {
    return useQuery(`/reviews/${id}`, async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface ReviewsShowAPI {
    success: boolean;
    review: ReviewsSchemaFromServe;
}

export interface ReviewsShowErrorAPI {
    success: boolean;
    message: string;
}
