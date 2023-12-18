import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";

function Limit() {
    const table = useContext(VigilioTableContext);
    if (table.pagination.value.total === 0) return null;
    return (
        <div class="flex items-center gap-2">
            <span class="text-sm dark:text-secondary-light text-secondary-dark">
                Limite:
            </span>
            <input
                placeholder={String(table.pagination.value.limit)}
                class="w-[80px] outline-none rounded-lg dark:text-secondary-light text-secondary-dark dark:bg-admin-terciary bg-paper-light py-1  shadow-sm border border-gray-200 dark:border-gray-600"
                onChange={(e) => {
                    const value = Number(e.currentTarget.value);
                    if (value < 1) return;
                    table.pagination.onchangeLimit(value);
                }}
                type="number"
            />
        </div>
    );
}

export default Limit;
