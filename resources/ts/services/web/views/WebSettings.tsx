import useDropdown from "~/hooks/useDropdown";
import WebTheme from "../WebTheme";
import useInformationstore from "@/information/stores/information.store";

function WebSettings() {
    const { dropdownOpen, dropdown, onOpenClose } = useDropdown();
    const { state } = useInformationstore();
    return (
        <div ref={dropdown} class="fixed bottom-[7rem] right-[2rem] z-[80]">
            <div
                class={`${
                    dropdownOpen ? "max-h-[250px]" : "max-h-[50px]"
                } overflow-hidden flex flex-col gap-2 delay-custom-1`}
            >
                <a
                    href={`https://wa.me/51${state.telephoneFirst}`}
                    target="_blank"
                    class="w-[50px] h-[50px] flex justify-center items-center right-4 bg-success p-4 rounded-full"
                    rel="noreferrer"
                >
                    <i class="fa-brands fa-whatsapp text-4xl text-white" />
                </a>
                <div class="w-[50px] h-[50px] flex justify-center items-center right-4 bg-black rounded-full">
                    <WebTheme />
                </div>
            </div>
            <button
                class="absolute -bottom-7 z-[100] right-[40%] mt-3"
                aria-label="close web settings"
                onClick={onOpenClose}
                type="button"
            >
                <i class="fa-solid fa-caret-down text-primary text-xl" />
            </button>
        </div>
    );
}

export default WebSettings;
