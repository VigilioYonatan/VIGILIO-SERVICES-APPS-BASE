import Loader from "~/components/Loader";
interface LoadingProps {
    className?: string;
}
function Loading({ className = "h-[calc(100vh-100px)]" }: LoadingProps) {
    return (
        <div class={`w-full ${className}  flex justify-center items-center`}>
            <div>
                <Loader width={60} height={60} border={6} />
                <span class="dark:text-secondary-light text-secondary-dark">
                    Cargando...
                </span>
            </div>
        </div>
    );
}

export default Loading;
