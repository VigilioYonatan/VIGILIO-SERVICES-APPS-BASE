import enviroments from "~/config";
import { type UseMutation, useMutation } from "@vigilio/preact-fetching";

export type CategoriesDestroyMutation = UseMutation<
    CategoriesDestroyAPI,
    number,
    CategoriesDestroyErrorAPI
>;
export function categoriesDestroyApi(): CategoriesDestroyMutation {
    return useMutation("/categories", async (url, id: number) => {
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

export interface CategoriesDestroyErrorAPI {
    success: boolean;
    message: string;
}
export interface CategoriesDestroyAPI {
    success: boolean;
    message: string;
}
