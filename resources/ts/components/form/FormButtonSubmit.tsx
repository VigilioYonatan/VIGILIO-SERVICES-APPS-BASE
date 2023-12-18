import { JSX } from "preact/jsx-runtime";
import LoaderSubmit from "../LoaderSubmit";

interface FormButtonSubmitProps {
    isLoading: boolean;
    title: string;
    className?: string;
    ico?: JSX.Element | JSX.Element[] | null;
}
function FormButtonSubmit({
    isLoading,
    title,
    className,
    ico = <i class="fa-regular fa-floppy-disk mr-1" />,
}: FormButtonSubmitProps) {
    return (
        <button
            type="submit"
            class={`${className} text-md bg-primary py-2 px-4 rounded-sm text-white font-bold uppercase mt-3 flex items-center gap-1`}
        >
            {isLoading ? (
                <LoaderSubmit color="white" />
            ) : (
                <>
                    {ico}
                    {title}
                </>
            )}
        </button>
    );
}

export default FormButtonSubmit;
