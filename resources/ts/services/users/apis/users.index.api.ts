import enviroments from "~/config";
import { type UseQuery, useQuery } from "@vigilio/preact-fetching";
import { type UsersSchemaFromServe } from "../schemas/users.schema";

export type UsersIndexApiMethod = UseQuery<UsersIndexAPI, unknown>;

export function usersIndexApi(): UsersIndexApiMethod {
    return useQuery("/users", async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result: UsersIndexAPI = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface UsersIndexAPI {
    success: boolean;
    data: UsersSchemaFromServe[];
}
