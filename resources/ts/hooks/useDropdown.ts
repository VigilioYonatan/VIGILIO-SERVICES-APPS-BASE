import { MutableRef, useEffect, useRef, useState } from "preact/hooks";
export interface UseDropdown {
    dropdownOpen: boolean;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    trigger: MutableRef<any>;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    dropdown: MutableRef<any>;
    onClose: (time?: number) => void;
    onOpen: () => void;
    onOpenClose: () => void;
}
function useDropdown(): UseDropdown {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const trigger = useRef<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const dropdown = useRef<any>(null);

    function onClose(time = 0) {
        setTimeout(() => {
            setDropdownOpen(false);
        }, time * 1000);
    }
    function onOpen() {
        setDropdownOpen(true);
    }
    function onOpenClose() {
        setDropdownOpen(!dropdownOpen);
    }
    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current?.contains(target)
            ) {
                return;
            }

            setDropdownOpen(false);
        };

        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [dropdownOpen]);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, []);
    return {
        dropdownOpen,
        trigger,
        dropdown,
        onClose,
        onOpen,
        onOpenClose,
    };
}

export default useDropdown;
