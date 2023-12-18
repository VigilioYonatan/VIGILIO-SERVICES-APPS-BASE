import enviroments from "~/config";
import {
    type UseQuery,
    useQuery,
    type OptionsQuery,
} from "@vigilio/preact-fetching";
import { type ReviewsSchemaFromServe } from "../schemas/reviews.schema";

export type ReviewsIndexApiMethod = UseQuery<ReviewsIndexAPI, unknown>;

export function reviewsIndexApi(
    options?: OptionsQuery<ReviewsIndexAPI, unknown>
): ReviewsIndexApiMethod {
    return useQuery(
        "/reviews",
        async function (url) {
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
            const result: ReviewsIndexAPI = await response.json();
            if (!result.success) throw result;
            return result;
        },
        options
    );
}

export interface ReviewsIndexAPI {
    success: boolean;
    data: ReviewsSchemaFromServe[];
}
