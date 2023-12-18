// import { useContext } from "preact/hooks";
// import { FormControlContext } from "./Form";
// import { type JSX } from "preact";
// import { PathValue, type Path, type UseFormReturn } from "react-hook-form";
// import MDEditor from "@uiw/react-md-editor";

// interface FormControlLabelProps {
//     title: string;
//     name: string;
//     question?: JSX.Element | JSX.Element[] | string;
//     ico?: JSX.Element | JSX.Element[];
// }
// function FormControlMarkdown<T extends object>({
//     name,
//     title,
// }: FormControlLabelProps) {
//     const {
//         register,
//         watch,
//         setValue,
//         formState: { errors },
//     } = useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);

//     return (
//         <div class="w-full">
//             <label
//                 class="text-xs dark:text-secondary-light text-secondary-dark capitalize font-semibold"
//                 htmlFor={name as string}
//             >
//                 {title}
//             </label>
//             <div class="flex items-center gap-2">
//                 <div
//                     class={`${
//                         (errors as T)[name as keyof T]
//                             ? "border border-red-600"
//                             : ""
//                     } w-full  flex flex-col  items-center gap-2 text-xs rounded-lg  overflow-hidden dark:text-secondary-light text-secondary-dark  my-1 shadow-sm `}
//                 >
//                     <MDEditor
//                         className="w-full min-h-[300px] max-h-[300px]"
//                         value={watch(name as Path<T>)}
//                         id={name as string}
//                         onChange={(value) => {
//                             setValue(
//                                 name as Path<T>,
//                                 value as PathValue<T, Path<T>>
//                             );
//                         }}
//                     />

//                     <input
//                         type="hidden"
//                         {...register(name as unknown as Path<T>)}
//                     />
//                 </div>
//             </div>
//             {(errors as T)[name as keyof T] ? (
//                 <p class="text-xs text-red-600">
//                     {errors[name as keyof T]?.message}
//                 </p>
//             ) : null}
//         </div>
//     );
// }

// export default FormControlMarkdown;
