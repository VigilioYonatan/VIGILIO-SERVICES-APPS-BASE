import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";

interface ThProps {
    className?: string;
}
function Th({
    className = "px-1 py-2 lg:px-3 lg:py-3  dark:bg-admin-terciary text-center cursor-pointer",
}: ThProps) {
    const table = useContext(VigilioTableContext);

    return (
        <>
            {table.table.Thead().map(({ isSort, key, value, methods }) => (
                <th scope="col" className={className} key={key}>
                    <div
                        aria-label="button to sort"
                        onClick={() => {
                            if (isSort) {
                                if (typeof isSort === "string") {
                                    methods?.sorting(isSort);
                                    return;
                                }
                                methods?.sorting(key);
                            }
                        }}
                        className="flex gap-1 justify-center items-center"
                    >
                        {isSort ? <i class="fa-solid fa-sort" /> : null}
                        <span class="line-clamp-1">{value}</span>
                    </div>
                </th>
            ))}
        </>
    );
}

export default Th;
