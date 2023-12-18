import enviroments from "~/config";
import { type UseMutation, useMutation } from "@vigilio/preact-fetching";

export type ReviewsDestroyMutation = UseMutation<
    ReviewsDestroyAPI,
    number,
    ReviewsDestroyErrorAPI
>;
export function reviewsDestroyApi(): ReviewsDestroyMutation {
    return useMutation("/reviews", async (url, id: number) => {
        const response = await fetch(
            `${enviroments.VITE_URL}/api${url}/${id}`,
            {
                method: "DELETE",
            }
        );
        const result = await response.json();

        if (!result.success) throw result;
        return result;
    });
}

export interface ReviewsDestroyErrorAPI {
    success: boolean;
    message: string;
}
export interface ReviewsDestroyAPI {
    success: boolean;
    message: string;
}
