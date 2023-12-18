import { formatDate } from "@vigilio/express-core/helpers";
import { Link } from "wouter-preact";
import { UsersSchemaFromServe } from "../schemas/users.schema";
import { printFileUser } from "../lib/helpers";
import AdminHr from "~/components/AdminHr";
interface UsersNewBoxProps {
    users: UsersSchemaFromServe[];
}
function UsersNewBox({ users }: UsersNewBoxProps) {
    return (
        <div class="dark:bg-admin-paper-dark rounded-md p-2 bg-background-light ">
            <span class="dark:text-secondary-light text-secondary-dark font-bold text-2xl mx-auto block mt-2">
                Nuevos usuarios
            </span>
            <AdminHr />
            <div class="w-full">
                {users
                    .map((user) => (
                        <Link
                            to={`/users/${user.slug}`}
                            className="flex gap-3 w-full p-2 hover:dark:bg-admin-terciary hover:bg-paper-light"
                        >
                            <img
                                width={50}
                                height={50}
                                src={printFileUser(user.foto)[0]}
                                alt={user.slug}
                                class="w-[50px] h-[50px] rounded-full object-cover"
                            />
                            <div class="flex flex-col gap-1  w-full">
                                <span class="dark:text-secondary-light text-secondary-darktext-sm font-semibold">
                                    {user.name}
                                </span>
                                <div class="flex gap-1 justify-between text-xs dark:text-secondary-light flex-wrap">
                                    <span class="whitespace-nowrap">
                                        {user.email}
                                    </span>
                                    <span class="bg-blue-600 py-1 px-3 rounded-md text-white">
                                        <i class="fas fa-calendar-week mr-1" />
                                        {formatDate(user.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                    .slice(0, 8)}
            </div>
        </div>
    );
}

export default UsersNewBox;
