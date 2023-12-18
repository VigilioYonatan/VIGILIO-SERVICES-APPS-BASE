import { useContext } from "preact/hooks";
import { FormControlContext } from "./Form";
import { type JSX } from "preact";
import {
    PathValue,
    type Path,
    type RegisterOptions,
    type UseFormReturn,
} from "react-hook-form";
import { Rating } from "react-custom-rating-component";

interface FormStarLabelProps<T extends object> {
    title: string;
    name: string;
    type?: HTMLInputElement["type"];
    question?: JSX.Element | JSX.Element[] | string;
    options?: RegisterOptions<T, Path<T>>;
}
function FormStar<T extends object>({ name, title }: FormStarLabelProps<T>) {
    const {
        register,
        getValues,
        setValue,
        watch,
        formState: { errors },
    } = useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);
    const defaultValue = getValues(name as Path<T>);
    function handleRating(rate: number) {
        setValue(name as Path<T>, rate as PathValue<T, Path<T>>);
    }
    const start = watch(name as Path<T>);
    return (
        <div class="w-full">
            <label
                class="text-xs dark:text-secondary-light text-secondary-dark capitalize font-semibold"
                htmlFor={name as string}
            >
                {title}
            </label>
            <div class="flex items-center gap-2">
                <Rating
                    onChange={handleRating}
                    defaultValue={defaultValue}
                    precision={0.5}
                />
                <span class="ml-2 text-secondary-dark dark:text-secondary-light">
                    {start}
                </span>

                <input
                    {...register(name as Path<T>)}
                    type="hidden"
                    class="outline-none bg-transparent  w-full px-2 sm:text-sm font-normal"
                />
            </div>
            {(errors as T)[name as keyof T] ? (
                <p class="text-xs text-red-600">
                    {errors[name as keyof T]?.message}
                </p>
            ) : null}
        </div>
    );
}

export default FormStar;
