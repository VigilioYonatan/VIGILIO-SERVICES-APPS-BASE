import { useCallback, useContext } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { FormControlContext } from "./Form";
import {
    Path,
    PathValue,
    RegisterOptions,
    UseFormReturn,
} from "react-hook-form";
interface FormFileProps<T extends object> {
    title: string;
    name: keyof T;
    multiple?: boolean;
    accept?: string;
    isDropzone?: boolean;
    typeFile?: "image" | "file" | "video" | { value: string };
    mode?: "update" | "append";
    typesText?: string;
    options?: RegisterOptions<T, Path<T>>;
}
function FormFile<T extends object>({
    multiple = false,
    accept = "*",
    isDropzone = true,
    typeFile = "file",
    typesText = "jpg, png, webp ó jpeg",
    name,
    title,
    options,
}: FormFileProps<T>) {
    const form =
        useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);
    const isDrag = useSignal<boolean>(false);
    const files = form.watch(name as unknown as Path<T>);

    const onChange = useCallback(
        (droppedFiles: FileList) => {
            const value = multiple
                ? [...(files || []), ...droppedFiles]
                : [...droppedFiles];
            form.setValue(
                name as unknown as Path<T>,
                value as PathValue<T, Path<T>>,
                {
                    shouldValidate: true,
                }
            );
        },
        [form.setValue, name, files]
    );

    function removeFile(fileParam: File) {
        const filterImages = Array.from(
            form.watch(name as unknown as Path<T>)
        ).filter((file) => file !== fileParam);
        form.setValue(
            name as unknown as Path<T>,
            filterImages.length
                ? (filterImages as PathValue<T, Path<T>>)
                : (undefined as PathValue<T, Path<T>>),
            { shouldValidate: true }
        );
    }
    function onDrop(e: Event) {
        e.preventDefault();

        const files = (e as DragEvent).dataTransfer?.files;
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        onChange(files!);
        isDrag.value = false;
    }

    function onDragEnter(e: Event) {
        e.preventDefault();

        if (!isDrag.value) {
            isDrag.value = true;
        }
    }
    function onDragLeave() {
        isDrag.value = false;
    }
    function printImageBlog(image: File) {
        return URL.createObjectURL(image);
    }

    return (
        <div class="w-full lg:mb-2">
            <label
                class="text-xs dark:text-secondary-light text-secondary-dark capitalize font-semibold"
                htmlFor={name as string}
            >
                {title}
            </label>
            <input
                id={name as string}
                hidden={isDropzone}
                type="file"
                multiple={multiple}
                accept={accept}
                {...form.register(name as unknown as Path<T>, {
                    ...options,
                    onChange(e: Event) {
                        const files = (e.target as HTMLInputElement).files;

                        // biome-ignore lint/style/noNonNullAssertion: <explanation>
                        onChange(files!);
                    },
                    value: null as PathValue<T, Path<T>>,
                })}
            />
            <label
                onDrop={onDrop}
                draggable={true}
                onDragOver={onDragEnter}
                onDragLeave={onDragLeave}
                htmlFor={name as unknown as Path<T>}
                class={`${
                    (form.formState.errors as T)[name] ? "border-danger" : ""
                } ${
                    isDrag.value ? "border-primary" : ""
                } flex w-full flex-col items-center py-6 justify-center min-h-[180px] border-2 border-dashed rounded-lg cursor-pointer dark:bg-admin-terciary bg-paper-light max-w-full min-w-[250px] my-2  shadow-sm border-gray-200 dark:border-gray-600`}
            >
                <div class="flex flex-wrap justify-center gap-3 w-full">
                    {(files as File[]) && (files as File[])?.length ? (
                        <>
                            {(files as File[]).map((file) => (
                                <div
                                    onClick={(e) => e.preventDefault()}
                                    class="w-[90px] h-[70px] relative flex justify-center items-center group"
                                >
                                    <div class="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-md overflow-hidden">
                                        {typeFile instanceof Object &&
                                        typeFile.value ? (
                                            <img
                                                alt=""
                                                class="w-[inherit] h-[inherit] object-contain"
                                                width="60"
                                                src={typeFile.value}
                                            />
                                        ) : null}
                                        {typeFile === "image" ? (
                                            <img
                                                alt=""
                                                class="w-[inherit] h-[inherit] object-cover"
                                                width="100"
                                                src={printImageBlog(file)}
                                                height="100"
                                            />
                                        ) : null}
                                        {typeFile === "video" ? (
                                            // biome-ignore lint/a11y/useMediaCaption: <explanation>
                                            <video
                                                width="150"
                                                height="150"
                                                src={printImageBlog(file)}
                                            />
                                        ) : null}
                                        {typeFile === "file" ? (
                                            <img
                                                alt=""
                                                src="/file.png"
                                                class="dropzone-vigilio__imgerror"
                                                width="60"
                                            />
                                        ) : null}

                                        <i class="far fa-file-image" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removeFile(file);
                                        }}
                                        class="absolute -top-2 -right-2 text-xs rounded-full bg-red-600 px-1 text-white"
                                    >
                                        x
                                    </button>
                                    <div class="z-10 justify-center items-center flex-col gap-2 hidden group-hover:flex">
                                        <span class="bg-black bg-opacity-70 whitespace-nowrap text-white py-0.5 px-1 rounded-md text-xs">
                                            {file.name}
                                        </span>
                                        <span class="bg-black bg-opacity-70 text-white py-0.5 px-1 rounded-md text-xs whitespace-nowrap">{`${String(
                                            file.size / 1000000
                                        ).slice(0, 4)}MB`}</span>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            {isDrag.value ? (
                                <>
                                    {typeFile === "image" ? (
                                        <i class="far fa-images text-4xl text-secondary-dark dark:text-secondary-light mb-3" />
                                    ) : null}
                                    {typeFile === "video" ? (
                                        <i class="fas fa-photo-video text-4xl text-secondary-dark dark:text-secondary-light mb-3" />
                                    ) : null}
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">
                                            Arrastra
                                        </span>
                                        y suelta los archivos
                                    </p>
                                </>
                            ) : (
                                <>
                                    {typeFile === "image" ? (
                                        <i class="far fa-images text-4xl text-secondary-dark dark:text-secondary-light mb-3" />
                                    ) : null}
                                    {typeFile === "video" ? (
                                        <i class="fas fa-photo-video text-4xl text-secondary-dark dark:text-secondary-light mb-3" />
                                    ) : null}

                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">
                                        {typesText}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </label>
            {(form.formState.errors as T)[name] ? (
                <p class="text-xs text-red-600">
                    {form.formState.errors[name]?.message}
                </p>
            ) : null}
        </div>
    );
}

export default FormFile;
