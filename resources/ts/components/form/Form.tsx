import { type JSX, createContext } from "preact";
import { type UseFormReturn } from "react-hook-form";

export const FormControlContext = createContext(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    {} as UseFormReturn<any, unknown, undefined>
);

interface FormProps<T extends object> extends UseFormReturn<T> {
    children: JSX.Element | JSX.Element[] | null;
    onSubmit: (data: T) => void;
}
function Form<T extends object>({ children, onSubmit, ...rest }: FormProps<T>) {
    return (
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        <FormControlContext.Provider value={rest as any}>
            <form onSubmit={rest.handleSubmit(onSubmit)} class="w-full">
                {children}
            </form>
        </FormControlContext.Provider>
    );
}

export default Form;
