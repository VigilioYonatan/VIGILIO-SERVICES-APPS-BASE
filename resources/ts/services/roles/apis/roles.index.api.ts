import enviroments from "~/config";
import { type UseQuery, useQuery } from "@vigilio/preact-fetching";
import { RolesSchemaFromServe } from "../schemas/roles.schema";

export type RolesIndexApiMethod = UseQuery<RolesIndexAPI, unknown>;

export function rolesIndexApi(): RolesIndexApiMethod {
    return useQuery("/roles", async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface RolesIndexAPI {
    success: boolean;
    data: RolesSchemaFromServe[];
}
