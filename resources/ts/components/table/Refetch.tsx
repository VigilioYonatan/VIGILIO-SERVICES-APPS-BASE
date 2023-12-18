import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";
function Refetch() {
    const table = useContext(VigilioTableContext);
    if (table.pagination.value.total === 0) return null;
    return (
        <button
            aria-label="refetch"
            type="button"
            class="bg-primary p-2 flex justify-center items-center rounded-md"
            onClick={() => table.refetch()}
        >
            <i class="fas fa-sync-alt text-white" />
        </button>
    );
}

export default Refetch;
