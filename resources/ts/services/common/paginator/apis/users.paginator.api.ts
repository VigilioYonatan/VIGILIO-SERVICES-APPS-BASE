import enviroments from "~/config";
import {
    UsersIndexMethodsPaginator,
    UsersIndexTable,
} from "@/users/lib/UsersColumns";
import { useQuery, type UseQuery } from "@vigilio/preact-fetching";
import { UsersSchemaFromServe } from "@/users/schemas/users.schema";

export type UsersPaginatorQuery = UseQuery<
    UsersPaginatorAPI,
    UsersPaginatorErrorAPI
>;
export function usersPaginatorApi(table: UsersIndexTable): UsersPaginatorQuery {
    const query = useQuery<UsersPaginatorAPI, UsersPaginatorErrorAPI>(
        "/users",
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
                    } as UsersIndexMethodsPaginator,
                });
            },
            clean: false,
        }
    );
    return query;
}

export interface UsersPaginatorAPI {
    success: boolean;
    count: number;
    next: string;
    previous: null;
    results: UsersSchemaFromServe[];
}

export interface UsersPaginatorErrorAPI {
    success: boolean;
    message: string;
    params: string;
}
