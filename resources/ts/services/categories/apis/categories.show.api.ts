import enviroments from "~/config";
import { UseQuery, useQuery } from "@vigilio/preact-fetching";
import { CategoriesSchemaFromServe } from "../schemas/categories.schema";

export function categoriesShowApi(
    id: number | string
): UseQuery<CategoriesShowAPI, CategoriesShowErrorAPI> {
    return useQuery(`/categories/${id}`, async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface CategoriesShowAPI {
    success: boolean;
    category: CategoriesSchemaFromServe;
}

export interface CategoriesShowErrorAPI {
    success: boolean;
    message: string;
}
