import enviroments from "~/config";
import {
    type UseQuery,
    useQuery,
    type OptionsQuery,
} from "@vigilio/preact-fetching";

export type CategoriesIndexApiMethod = UseQuery<CategoriesIndexAPI, unknown>;

export function categoriesIndexApi(
    options?: OptionsQuery<CategoriesIndexAPI, unknown>
): CategoriesIndexApiMethod {
    return useQuery(
        "/categories",
        async function (url) {
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
            const result: CategoriesIndexAPI = await response.json();
            if (!result.success) throw result;
            return result;
        },
        options
    );
}

export interface CategoriesIndexAPI {
    success: boolean;
    data: Category[];
}

export interface Category {
    id: number;
    name: string;
    icon: string;
    image: Image[];
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface Image {
    file: string;
    dimension: number;
}
