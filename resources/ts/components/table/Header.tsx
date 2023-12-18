import { JSX } from "preact/jsx-runtime";

interface HeaderProps {
    className?: string;
    children: JSX.Element | JSX.Element[];
}
function Header({
    className = "flex justify-between items-center lg:mx-6 mx-1 gap-3 mb-4",
    children,
}: HeaderProps) {
    return <div className={className}>{children}</div>;
}

export default Header;
