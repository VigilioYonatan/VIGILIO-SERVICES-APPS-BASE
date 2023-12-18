import Loading from "@/admin/components/Loading";
import { type UseQuery } from "@vigilio/preact-fetching";
import { type UseTable } from "@vigilio/preact-table";
import { createContext } from "preact";
import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export const vigilioTableContext = <
    T extends object,
    K extends string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    Y extends object = any
>() => {
    return createContext(
        {} as UseTable<T, K, Y> & {
            refetch: (clean?: boolean | undefined) => Promise<void>;
        }
    );
};
export const VigilioTableContext = vigilioTableContext();
interface VigilioTableProps<
    T extends object,
    K extends string,
    Y extends object
> {
    query: UseQuery<
        object,
        {
            success: boolean;
            message: string;
            params: string;
        }
    >;
    table: UseTable<T, K, Y>;

    children: JSX.Element | JSX.Element[];
}
function VigilioTable<T extends object, K extends string, Y extends object>({
    query,
    table,
    children,
}: VigilioTableProps<T, K, Y>) {
    useEffect(() => {
        query.refetch(false);
    }, [
        table.pagination.page,
        table.pagination.value.limit,
        table.sort.value,
        table.search.debounceTerm,
    ]);

    let component: null | JSX.Element | JSX.Element[] = null;
    if (query.isLoading) {
        component = <Loading />;
    }
    if (query.isSuccess) {
        component = children;
    }
    if (query.isError) {
        component = <div>{JSON.stringify(query.error)}</div>;
    }

    return (
        <VigilioTableContext.Provider
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            value={{ ...(table as any), refetch: query.refetch }}
        >
            {component}
        </VigilioTableContext.Provider>
    );
}

export default VigilioTable;
