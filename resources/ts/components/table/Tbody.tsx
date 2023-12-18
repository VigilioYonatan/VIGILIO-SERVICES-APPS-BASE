import { JSX } from "preact/jsx-runtime";
interface TbodyProps {
    className?: string;
    children: JSX.Element | JSX.Element[];
}
function Tbody({ className = "w-full", children }: TbodyProps) {
    return <tbody className={className}>{children}</tbody>;
}

export default Tbody;
