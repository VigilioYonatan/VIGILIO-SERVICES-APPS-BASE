import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    GoogleMapProps,
    MarkerProps,
} from "@react-google-maps/api";
import { useContext } from "preact/hooks";
import { Path, PathValue, UseFormReturn } from "react-hook-form";
import { coordMaps } from "~/config/settings";
import { FormControlContext } from "./Form";
import { JSX } from "preact/jsx-runtime";
interface FormControlLabelProps<T extends object> {
    title: string;
    name: keyof T;
    question?: JSX.Element | JSX.Element[] | string;
}
const GoogleMapPreact = GoogleMap as unknown as (
    props: GoogleMapProps
) => JSX.Element;
const MarkerMarkPreact = Marker as unknown as (
    props: MarkerProps
) => JSX.Element;

function FormMap<T extends object>({
    name,
    title,
    question,
}: FormControlLabelProps<T>) {
    const {
        register,
        setValue,
        resetField,
        formState: { errors },
        watch,
    } = useContext<UseFormReturn<T, unknown, undefined>>(FormControlContext);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDy3G0jNTJoDTCVDV7Cjm30javbCbr2lsk",
    });

    const handleMapClick: GoogleMapProps["onClick"] = (props) => {
        const lat = props.latLng?.lat();
        const lng = props.latLng?.lng();

        setValue(
            name as unknown as Path<T>,
            { lat, lng } as PathValue<T, Path<T>>
        );
    };
    const map = watch(name as unknown as Path<T>);
    return (
        <>
            <div class="w-full">
                <label
                    class="text-xs dark:text-secondary-light text-secondary-dark capitalize font-semibold"
                    htmlFor={name as string}
                >
                    {title}
                </label>
                <div class="relative flex items-center gap-2 w-full">
                    {isLoaded ? (
                        <div class="w-full flex flex-col gap-1 justify-center items-center">
                            <GoogleMapPreact
                                center={map || coordMaps}
                                zoom={13}
                                onClick={handleMapClick}
                                mapContainerStyle={{
                                    width: "100%",
                                    height: "200px",
                                }}
                            >
                                <MarkerMarkPreact
                                    position={
                                        map as unknown as {
                                            lng: number;
                                            lat: number;
                                        }
                                    }
                                />
                            </GoogleMapPreact>
                            {map ? (
                                <span class="w-full text-[9px] dark:text-secondary-light text-secondary-dark flex gap-1">
                                    {JSON.stringify(map)}
                                    <button
                                        type="button"
                                        class="text-xs bg-primary px-2 py-1 rounded-md text-white"
                                        onClick={() =>
                                            resetField(
                                                name as unknown as Path<T>
                                            )
                                        }
                                    >
                                        <i class="fa-solid fa-eraser" />
                                    </button>
                                </span>
                            ) : null}

                            <input
                                type="hidden"
                                {...register(name as unknown as Path<T>)}
                            />
                        </div>
                    ) : null}

                    {question ? (
                        <div class="relative group">
                            <i class="fa-solid fa-circle-question text-xs text-white" />
                            <span class="text-[9px] min-w-[100px] hidden group-hover:block -top-[35px] right-1 p-1 shadow dark:bg-background-dark text-center absolute rounded-md text-white">
                                {question}
                            </span>
                        </div>
                    ) : null}
                </div>
                {(errors as T)[name] ? (
                    <p class="text-xs text-red-600">{errors[name]?.message}</p>
                ) : null}
            </div>
        </>
    );
}

export default FormMap;
