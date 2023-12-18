import { UseFormReturn } from "react-hook-form";
import { FormControlContext } from "./Form";
import { useContext } from "preact/hooks";
function FormButtonReset<T extends object>() {
    const { reset } =
        useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);
    return (
        <button
            type="button"
            aria-label="reset form"
            class="bg-primary px-6 py-3 text-white rounded-md font-bold text-xs uppercase flex items-center gap-2"
            onClick={() => reset()}
        >
            <i class="fa-solid fa-rotate-right" />
            Resetear
        </button>
    );
}

export default FormButtonReset;
