import { JSX } from "preact/jsx-runtime";

interface TheadRowProps {
    className?: string;
    children: JSX.Element | JSX.Element[];
}
function TheadRow({ className, children }: TheadRowProps) {
    return <tr class={className}>{children}</tr>;
}

export default TheadRow;
