import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";
import { sweetAlert } from "@vigilio/sweet";

interface ToolsProps {
    onRemoveAll: (props: number[]) => void;
    hiddenInput?: boolean;
    hiddenDelete?: boolean;
}
function Tools({
    onRemoveAll,
    hiddenInput = false,
    hiddenDelete = false,
}: ToolsProps) {
    const table = useContext(VigilioTableContext);

    function onRemove() {
        if (table.checks.isEmptyCheck()) {
            sweetAlert({ icon: "info", title: "Seleccione que deseas borrar" });
            return;
        }
        onRemoveAll(table.checks.value);
    }
    return (
        <div class="flex gap-2 lg:gap-4 items-center">
            {!hiddenInput ? (
                <div class="w-full">
                    <div class="flex items-center gap-2">
                        <search class="lg:w-[200px] h-[2.5rem] flex items-center gap-2 text-xs rounded-lg  overflow-hidden dark:text-secondary-light text-secondary-dark dark:bg-admin-terciary bg-paper-light my-1 shadow-sm border border-gray-200 dark:border-gray-600">
                            <input
                                class="outline-none bg-transparent  w-full px-2 sm:text-sm font-normal"
                                onChange={(e) =>
                                    table.search.onSearchByName(
                                        e.currentTarget.value
                                    )
                                }
                                value={table.search.value}
                                id="table-search-users"
                                placeholder="Buscar por id o nombre"
                            />
                        </search>
                    </div>
                </div>
            ) : null}
            {!hiddenDelete ? (
                <div class="flex gap-4 items-center">
                    {table.pagination.value.total !== 0 ? (
                        <button
                            class="dark:text-terciary text-secondary-dark"
                            type="button"
                            aria-label="delete many"
                            onClick={onRemove}
                        >
                            <i class="fas fa-trash" />
                        </button>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default Tools;
