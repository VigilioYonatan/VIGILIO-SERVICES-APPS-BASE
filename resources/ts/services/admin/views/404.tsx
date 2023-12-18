import Svg404 from "~/components/Svg404";

function View404({ message = "Pagina No encontrada" }: { message?: string }) {
    return (
        <div className="p-4 max-w-[800px]">
            <span class="dark:text-white text-black text-2xl font-bold text-center block">
                {message}
            </span>
            <div>
                <Svg404 />
            </div>
        </div>
    );
}

export default View404;
