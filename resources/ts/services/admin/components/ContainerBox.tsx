import { JSX } from "preact/jsx-runtime";

interface ContainerBoxProps {
    children: JSX.Element | JSX.Element[];
}
function ContainerBox({ children }: ContainerBoxProps) {
    return (
        <div class="dark:bg-admin-paper-dark bg-background-light p-4 rounded-md shadow-sm  border border-gray-200 dark:border-gray-700">
            {children}
        </div>
    );
}

export default ContainerBox;
