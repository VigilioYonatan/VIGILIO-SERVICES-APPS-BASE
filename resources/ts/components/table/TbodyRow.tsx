import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";
import { JSX } from "preact/jsx-runtime";
interface TbodyRowProps<T extends object> {
    className?: string;
    handleClick?: (data: T) => void;
    children: (data: T) => JSX.Element | JSX.Element[];
}
function TbodyRow<T extends object>({
    className = "border-b h-[60px] dark:border-admin-terciary border-paper-light hover:bg-paper-light  dark:hover:bg-admin-terciary dark:text-secondary-light dark:hover:text-secondary-light",
    handleClick,
    children,
}: TbodyRowProps<T>) {
    const table = useContext(VigilioTableContext);
    function onClick(data: T) {
        if (handleClick) {
            handleClick(data);
        }
    }

    return (
        <>
            {table.pagination.value.total === 0 ? (
                <tr className="w-full text-center h-[300px]">
                    <td
                        colSpan={table.table.Thead().length}
                        className="dark:text-white text-black"
                    >
                        No hay columnas
                    </td>
                </tr>
            ) : (
                <>
                    {table.table.TBody.Row().map(({ ...data }) => (
                        <tr
                            className={className}
                            onClick={() => onClick(data as T)}
                            key={data.index}
                        >
                            {children(data as T)}
                        </tr>
                    ))}
                </>
            )}
        </>
    );
}

export default TbodyRow;
