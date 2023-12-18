import ButtonCart from "@/cart/components/ButtonCart";
import ButtonCarta from "./ButtonCarta";
import useDropdown from "~/hooks/useDropdown";
import CartAside from "@/cart/components/CartAside";
import { useEffect } from "preact/hooks";
import ButtonAuth from "@/auth/views/ButtonAuth";
import { InformationSchemaFromServe } from "@/information/schemas/information.schema";
import useInformationstore from "@/information/stores/information.store";
import { AuthLogin } from "@/auth/schemas/auth.schema";
import useAuthstore from "@/auth/stores/auth.store";

interface WebTabsProps {
    $information: InformationSchemaFromServe;
    $user: AuthLogin;
}
function WebTabs({ $information, $user }: WebTabsProps) {
    const { onOpen, dropdownOpen, onClose } = useDropdown();
    const { onLogin } = useAuthstore();
    const { onInit } = useInformationstore();

    useEffect(() => {
        onLogin($user);
    }, []);

    useEffect(() => {
        onInit($information);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", dropdownOpen);
    }, [dropdownOpen]);

    return (
        <>
            <div class="flex fixed bottom-0 py-3 bg-secondary right-0 left-0 z-[80] lg:z-auto lg:static lg:gap-6">
                <ButtonAuth />
                <ButtonCarta />
                <ButtonCart onOpen={onOpen} />
            </div>
            <aside
                class={`${
                    dropdownOpen ? "visible" : "invisible"
                } fixed top-0 left-0 bottom-0  right-0 z-[100] h-screen w-full bg-black bg-opacity-80 flex justify-end`}
                onClick={() => onClose()}
            >
                <CartAside dropdownOpen={dropdownOpen} onClose={onClose} />
            </aside>
        </>
    );
}

export default WebTabs;
