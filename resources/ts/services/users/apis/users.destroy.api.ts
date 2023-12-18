import enviroments from "~/config";
import { type UseMutation, useMutation } from "@vigilio/preact-fetching";

export type UsersDestroyMutation = UseMutation<
    UsersDestroyAPI,
    number,
    UsersDestroyErrorAPI
>;
export function usersDestroyApi(): UsersDestroyMutation {
    return useMutation("/users", async (url, id: number) => {
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

export interface UsersDestroyErrorAPI {
    success: boolean;
    message: string;
}
export interface UsersDestroyAPI {
    success: boolean;
    message: string;
}
