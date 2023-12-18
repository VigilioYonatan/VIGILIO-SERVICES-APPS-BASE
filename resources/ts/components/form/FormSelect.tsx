import { useContext } from "preact/hooks";
import { FormControlContext } from "./Form";
import { JSX } from "preact";
import { Path, RegisterOptions, UseFormReturn } from "react-hook-form";
import { HTMLAttributes } from "preact/compat";

interface FormControlLabelProps<T extends object>
    extends Omit<HTMLAttributes<HTMLSelectElement>, "type" | "name"> {
    title: string;
    name: keyof T;
    question?: JSX.Element | JSX.Element[] | string;
    options?: RegisterOptions<T, Path<T>>;
    placeholder: string;
    ico?: JSX.Element | JSX.Element[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    array: { value: string; key: any }[];
}
function FormSelect<T extends object>({
    name,
    title,
    question,
    options = {},
    array,
    placeholder,
    ico,
    ...rest
}: FormControlLabelProps<T>) {
    const {
        register,
        getValues,
        formState: { errors },
    } = useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);

    return (
        <div class="lg:mb-2 w-full h-[95px]">
            <label
                class="text-xs dark:text-secondary-light text-secondary-dark capitalize font-semibold"
                htmlFor={name as string}
            >
                {title}
            </label>
            <div class="flex items-center gap-2">
                <div
                    class={`${
                        (errors as T)[name] ? "border border-red-600" : ""
                    } w-full h-[2.5rem] flex items-center text-xs rounded-lg  overflow-hidden dark:text-secondary-light text-secondary-dark dark:bg-admin-terciary bg-paper-light my-1 shadow-sm border border-gray-200 dark:border-gray-600`}
                >
                    {ico ? (
                        <div class="dark:bg-admin-background-dark bg-background-light  shadow min-w-[2.8rem]  h-full flex justify-center items-center">
                            {ico}
                        </div>
                    ) : null}
                    <select
                        id={name as string}
                        class={`${
                            (errors as T)[name] ? "border-red-600" : ""
                        }  bg-transparent  my-1 text-sm w-full outline-none shadow-sm`}
                        {...rest}
                        {...register(name as unknown as Path<T>, options)}
                    >
                        <option class="text-black" value="">
                            {placeholder}
                        </option>
                        {array.map(({ value, key }) => (
                            <option
                                selected={
                                    getValues(name as unknown as Path<T>) ===
                                    key
                                }
                                class="text-black"
                                value={key}
                                key={key}
                            >
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                {question ? (
                    <div class="relative group ">
                        <i class="fa-solid fa-circle-question text-xs dark:text-white" />
                        <div class="text-[9px] min-w-[100px] hidden group-hover:block -top-[35px] right-1 p-1 shadow text-center absolute rounded-md dark:bg-admin-background-dark bg-background-light dark:text-white">
                            {question}
                        </div>
                    </div>
                ) : null}
            </div>
            {(errors as T)[name] ? (
                <p class="text-xs text-red-600">{errors[name]?.message}</p>
            ) : null}
        </div>
    );
}

export default FormSelect;
