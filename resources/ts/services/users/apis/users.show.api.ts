import enviroments from "~/config";
import { UseQuery, useQuery } from "@vigilio/preact-fetching";
import { UsersSchemaFromServe } from "../schemas/users.schema";

export function usersShowApi(
    id: number | string
): UseQuery<UsersShowAPI, UsersShowErrorAPI> {
    return useQuery(`/users/${id}`, async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result: UsersShowAPI = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface UsersShowAPI {
    success: boolean;
    user: UsersSchemaFromServe;
}



export interface UsersShowErrorAPI {
    success: boolean;
    message: string;
}
