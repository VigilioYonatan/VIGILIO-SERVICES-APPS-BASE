import { JSX } from "preact/jsx-runtime";

interface TableProps {
    className?: string;
    children: JSX.Element | JSX.Element[];
}

function Table({
    className = "text-sm text-left  h-full shadow w-full",
    children,
}: TableProps) {
    return <table className={className}>{children}</table>;
}

export default Table;
