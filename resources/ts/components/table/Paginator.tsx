import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";

function Paginator() {
    const table = useContext(VigilioTableContext);

    if (table.pagination.totalPages < 2) return null;
    return (
        <ul class="flex items-center w-full -space-x-px h-8 lg:h-10 text-base justify-center">
            <li>
                <button
                    onClick={() => table.pagination.onBackPage()}
                    type="button"
                    class="flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    aria-label="button previous table"
                >
                    <i class="fa-solid fa-circle-chevron-left" />
                </button>
            </li>
            {table.pagination.startingBreakPointButtonIfCondition ? (
                <li class="flex items-center justify-center">
                    <button
                        type="button"
                        class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        aria-label="button change page table"
                        onClick={() => table.pagination.onChangePage(1)}
                    >
                        1
                    </button>
                    <span class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        ...
                    </span>
                </li>
            ) : null}
            {table.pagination.paginator.pages.map((page) => (
                <li key={page}>
                    {table.pagination.paginator.currentPage === page ? (
                        <span class="z-10 flex items-center justify-center px-2 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                            {page}
                        </span>
                    ) : (
                        <button
                            v-else
                            type="button"
                            class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            aria-label="button change page table"
                            onClick={() => table.pagination.onChangePage(page)}
                        >
                            {page}
                        </button>
                    )}
                </li>
            ))}
            {table.pagination.endingBreakPointButtonIfCondition ? (
                <li class="flex items-center justify-center">
                    <span class="z-10 flex items-center justify-center px-2 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                        ...
                    </span>
                    <button
                        type="button"
                        class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        aria-label="button change page table"
                        onClick={() =>
                            table.pagination.onChangePage(
                                table.pagination.totalPages
                            )
                        }
                    >
                        {table.pagination.totalPages}
                    </button>
                </li>
            ) : null}

            <li>
                <button
                    onClick={() => table.pagination.onNextPage()}
                    type="button"
                    aria-label="button next page table"
                    class="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <i className="fa-solid fa-circle-chevron-right" />
                </button>
            </li>
        </ul>
    );
}

export default Paginator;
