import enviroments from "~/config";
import {
    CategoriesIndexMethodsPaginator,
    CategoriesIndexTable,
} from "@/categories/lib/CategoriesColumns";
import { useQuery, type UseQuery } from "@vigilio/preact-fetching";
import { CategoriesSchemaFromServe } from "@/categories/schemas/categories.schema";

export type CategoriesPaginatorQuery = UseQuery<
    CategoriesPaginatorAPI,
    CategoriesPaginatorErrorAPI
>;
export function categoriesPaginatorApi(
    table: CategoriesIndexTable
): CategoriesPaginatorQuery {
    const query = useQuery<CategoriesPaginatorAPI, CategoriesPaginatorErrorAPI>(
        "/categories",
        async function (url) {
            const data = new URLSearchParams();
            data.append("offset", String(table.pagination.value.offset));
            data.append("search", table.search.debounceTerm);
            data.append("limit", String(table.pagination.value.limit));
            if (!Object.keys(table.sort.value).length) {
                data.append("id", "DESC");
            }
            for (const [key, value] of Object.entries(table.sort.value)) {
                data.append(key, value as string);
            }
            const response = await fetch(
                `${enviroments.VITE_URL}/api/paginator${url}?${data}`
            );
            const result = await response.json();
            if (!result.success) throw result;
            return result;
        },
        {
            onSuccess(data) {
                table.updateData({
                    count: data.count,
                    result: data.results,
                    methods: {
                        refetch: query.refetch,
                    } as CategoriesIndexMethodsPaginator,
                });
            },
            clean: false,
        }
    );
    return query;
}

export interface CategoriesPaginatorAPI {
    success: boolean;
    count: number;
    next: string;
    previous: null;
    results: CategoriesSchemaFromServe[];
}

export interface Image {
    file: string;
    dimension: number;
}
export interface CategoriesPaginatorErrorAPI {
    success: boolean;
    message: string;
    params: string;
}
