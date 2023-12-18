import { JSX } from "preact/jsx-runtime";
import AdminHr from "~/components/AdminHr";

interface BoxEntityProps {
    title: string;
    quantity: string;
    color?: string;
    ico: JSX.Element;
}
function BoxEntity({
    title,
    quantity,
    color = "bg-danger",
    ico,
}: BoxEntityProps) {
    return (
        <div className="flex-1 min-w-[250px] lg:max-w-[300px] rounded-md shadow w-full  bg-background-light dark:bg-admin-paper-dark p-4 relative">
            <div
                class={`${color}  w-[50px] h-[50px] rounded-md flex justify-center items-center shadow absolute left-4 -top-2 text-white text-xl`}
            >
                {ico}
            </div>
            <div class="">
                <div class="flex justify-end">
                    <div className="flex flex-col justify-center items-center">
                        <span class="text-terciary text-sm">{title}</span>
                        <span class="dark:text-secondary-light text-2xl font-bold text-secondary-dark">
                            {quantity}
                        </span>
                    </div>
                </div>
                <AdminHr />

                <div className="flex gap-1 items-center">
                    <span class="text-success font-semibold text-sm">+44%</span>
                    <span class="text-terciary text-sm">than last week</span>
                </div>
            </div>
        </div>
    );
}

export default BoxEntity;
