import { JSX } from "preact/jsx-runtime";
import {
    Link,
    LinkProps,
    useRoute,
    type BaseLocationHook,
    type LocationHook,
} from "wouter-preact";
import useDropdown from "~/hooks/useDropdown";

const NavLink = <H extends BaseLocationHook = LocationHook>(
    props: LinkProps<H> & {
        title: string;
        Icon: JSX.Element;
        uris?: { title: string; to: string }[];
    }
) => {
    const { title, Icon, ...rest } = props;
    const [isActive] = useRoute(props.to as string);
    const { dropdownOpen, onOpenClose, dropdown } = useDropdown();
    return (
        <div
            ref={dropdown}
            class={`${
                isActive || dropdownOpen
                    ? "dark:bg-admin-terciary bg-paper-light [>&svg]:text-terciary "
                    : "text-terciary dark:hover:bg-admin-terciary hover:bg-paper-light"
            } px-2 py-1 w-full rounded-md text-sm lg:text-base`}
        >
            <div class="flex justify-between items-center w-full py-1">
                <Link {...rest}>
                    <button
                        type="button"
                        class="flex gap-2 items-center w-full dark:hover:text-white dark:text-terciary text-secondary-dark"
                    >
                        {Icon}
                        <span class="font-semibold hidden md:block ">
                            {title}
                        </span>
                    </button>
                </Link>
                {props.uris ? (
                    <button type="button" onClick={onOpenClose}>
                        <i class="fas fa-caret-down" />
                    </button>
                ) : null}
            </div>
            {props.uris ? (
                <div
                    class={`absolute   rounded-sm sm:static flex flex-col  items-start delay-custom-1 overflow-hidden ${
                        dropdownOpen ? "max-h-[600px] p-2" : "max-h-0"
                    }`}
                >
                    {props.uris.map((link) => (
                        <NavLinkChild link={link} key={link.to} />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
interface NavLinkChildProps {
    link: { to: string; title: string };
}
function NavLinkChild({ link }: NavLinkChildProps) {
    const [isActive] = useRoute(link.to as string);

    return (
        <Link key={link.to} to={link.to}>
            <button
                type="button"
                class={`${
                    isActive ? "" : ""
                } font-semibold sm:pl-2 w-full p-1.5 dark:hover:text-white dark:text-terciary text-secondary-dark text-start`}
            >
                {link.title}
            </button>
        </Link>
    );
}

export default NavLink;
