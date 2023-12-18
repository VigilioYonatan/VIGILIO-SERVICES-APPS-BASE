import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";

function Show() {
    const table = useContext(VigilioTableContext);
    if (table.pagination.value.total === 0) return null;
    return (
        <span class="text-xs lg:text-sm text-gray-700 dark:text-gray-400">
            Mostrando{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
                {table.table.TBody.Row().length}
            </span>{" "}
            de
            <span class="font-semibold text-gray-900 dark:text-white">
                {" "}
                {table.pagination.totalPages}
            </span>{" "}
            páginas de
            <span class="font-semibold text-gray-900 dark:text-white">
                {" "}
                {table.pagination.value.total}
            </span>{" "}
            en total
        </span>
    );
}

export default Show;
