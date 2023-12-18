import { JSX } from "preact/jsx-runtime";

interface ContainerProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
}
function Container({ children, className = "" }: ContainerProps) {
    return (
        <div
            class={`${className} flex flex-col gap-4 py-4 dark:bg-admin-paper-dark bg-background-light shadow-sm  border border-gray-200 dark:border-gray-700 text-star`}
        >
            {children}
        </div>
    );
}

export default Container;
