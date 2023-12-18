import enviroments from "~/config";
import {
    RolesIndexMethodsPaginator,
    RolesIndexTable,
} from "@/roles/lib/RolesColumns";
import { useQuery, type UseQuery } from "@vigilio/preact-fetching";

export type RolesPaginatorQuery = UseQuery<
    RolesPaginatorAPI,
    RolesPaginatorErrorAPI
>;
export function rolesPaginatorApi(table: RolesIndexTable): RolesPaginatorQuery {
    const query = useQuery<RolesPaginatorAPI, RolesPaginatorErrorAPI>(
        "/roles",
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
                    } as RolesIndexMethodsPaginator,
                });
            },
            clean: false,
        }
    );
    return query;
}

export interface RolesPaginatorAPI {
    success: boolean;
    count: number;
    next: string;
    previous: null;
    results: Rol[];
}

export interface Rol {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface RolesPaginatorErrorAPI {
    success: boolean;
    message: string;
    params: string;
}
