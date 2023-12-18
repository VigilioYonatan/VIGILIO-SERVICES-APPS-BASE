import { sweetModal } from "@vigilio/sweet";
import { reactComponent } from "~/lib/preact";
import { lazy } from "preact/compat";
const WebCarta = lazy(() => import("./WebCarta"));
function ButtonCarta() {
    function onOpenCarta() {
        sweetModal({
            html: reactComponent(<WebCarta />),
            showCloseButton: true,
            position: "start",
            sweetWidth: "800px",
        });
    }
    return (
        <button
            class="flex justify-center w-full items-center text-white flex-col gap-1 flex-1 lg:hidden"
            type="button"
            aria-label="open carta"
            onClick={onOpenCarta}
        >
            <i class="fas fa-utensils text-2xl" />
            <span class="text-[10px] font-semibold uppercase">carta</span>
        </button>
    );
}

export default ButtonCarta;
