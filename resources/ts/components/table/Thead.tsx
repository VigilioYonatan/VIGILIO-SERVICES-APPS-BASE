import { JSX } from "preact/jsx-runtime";
interface TheadProps {
    className?: string;
    children: JSX.Element | JSX.Element[];
}
function Thead({
    children,
    className = "text-[10px] lg:text-xs bg-paper-light dark:bg-admin-terciary text-secondary-dark dark:text-terciary uppercase  shadow-sm  border-b dark:border-admin-terciary",
}: TheadProps) {
    return <thead className={className}>{children}</thead>;
}

export default Thead;
