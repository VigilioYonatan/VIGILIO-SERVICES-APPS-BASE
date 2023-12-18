import { useContext } from "preact/hooks";
import { VigilioTableContext } from "./VigilioTable";
interface TdProps<T extends object> {
    data: T;
    className?: string;
}
function Td<T extends object>({
    data,
    className = "px-1 lg:py-1 whitespace-nowrap text-center  text-xs lg:text-sm",
}: TdProps<T>) {
    const table = useContext(VigilioTableContext);

    return (
        <>
            {table.table.TBody.Cell(data).map(({ key, value }) => {
                return (
                    <td class={className} key={key}>
                        {value ?? "No se ingresó"}
                    </td>
                );
            })}
        </>
    );
}

export default Td;
