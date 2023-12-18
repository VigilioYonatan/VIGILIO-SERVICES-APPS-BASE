import { JSX } from "preact/jsx-runtime";

interface FooterProps {
    className?: string;
    children: JSX.Element | JSX.Element[];
}
function Footer({
    className = "mt-6 flex gap-2 flex-wrap justify-center items-center mx-4",
    children,
}: FooterProps) {
    return <nav className={className}>{children}</nav>;
}

export default Footer;
