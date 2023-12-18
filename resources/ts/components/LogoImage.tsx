import { printLogoInformation } from "@/information/lib/helpers";
import useInformationstore from "@/information/stores/information.store";

interface LogoImageProps {
    width?: string;
    height?: string;
}
function LogoImage({ height = "100", width = "100" }: LogoImageProps) {
    const { state } = useInformationstore();
    return (
        <>
            {state.logo ? (
                <img
                    class={`w-[${width}px] h-[${height}px] object-contain`}
                    width={width}
                    height={height}
                    src={printLogoInformation(state.logo)[0]}
                    alt="Yonatan Logo"
                />
            ) : (
                <span class="text-primary font-vigilio-title">
                    {state.name}
                </span>
            )}
        </>
    );
}

export default LogoImage;
