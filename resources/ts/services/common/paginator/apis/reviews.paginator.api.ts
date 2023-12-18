import enviroments from "~/config";
import {
    ReviewsIndexMethodsPaginator,
    ReviewsIndexTable,
} from "@/reviews/lib/ReviewsColumns";
import { useQuery, type UseQuery } from "@vigilio/preact-fetching";
import { ReviewsSchemaFromServe } from "@/reviews/schemas/reviews.schema";

export type ReviewsPaginatorQuery = UseQuery<
    ReviewsPaginatorAPI,
    ReviewsPaginatorErrorAPI
>;
export function reviewsPaginatorApi(
    table: ReviewsIndexTable
): ReviewsPaginatorQuery {
    const query = useQuery<ReviewsPaginatorAPI, ReviewsPaginatorErrorAPI>(
        "/reviews",
        async function (url) {
            const data = new URLSearchParams();
            data.append("offset", String(table.pagination.value.offset));
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
                    } as ReviewsIndexMethodsPaginator,
                });
            },
            clean: false,
        }
    );
    return query;
}

export interface ReviewsPaginatorAPI {
    success: boolean;
    count: number;
    next: string;
    previous: null;
    results: ReviewsSchemaFromServe[];
}

export interface Image {
    file: string;
    dimension: number;
}
export interface ReviewsPaginatorErrorAPI {
    success: boolean;
    message: string;
    params: string;
}
