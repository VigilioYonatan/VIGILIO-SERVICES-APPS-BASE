import { type UsersPaginatorQuery } from "@/common/paginator/apis/users.paginator.api";
import { type UsersDestroyMutation } from "../apis/users.destroy.api";
import {
    type Columns,
    type UseTable,
    type UseTableMethods,
} from "@vigilio/preact-table";
import { Link } from "wouter-preact";
import {
    icoRole,
    icoRoleColor,
    printFileUser,
    numberPhoneFormated,
} from "./helpers";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";
import { UsersSchemaFromServe } from "../schemas/users.schema";

export type UsersIndexSecondaryPaginator = "acciones" | "index";
export type UsersIndexMethodsPaginator = {
    mutate: UsersDestroyMutation["mutate"];
    refetch: UsersPaginatorQuery["refetch"];
} & UseTableMethods<UsersSchemaFromServe, UsersIndexSecondaryPaginator>;
export type UsersColumnsPaginator = Columns<
    UsersSchemaFromServe,
    UsersIndexSecondaryPaginator,
    UsersIndexMethodsPaginator
>;
export type UsersIndexTable = UseTable<
    UsersSchemaFromServe,
    UsersIndexSecondaryPaginator,
    UsersIndexMethodsPaginator
>;
const usersColumns: UsersColumnsPaginator = [
    {
        key: "index",
        header: (_key, methods, data) => {
            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        class="w-4 h-4"
                        checked={!methods.isEmptyCheck()}
                        onChange={() => {
                            for (const value of data) {
                                methods.onCheck(value.id);
                            }
                        }}
                    />
                </div>
            );
        },
        cell: (props, _i, methods) => (
            <div onClick={(e) => e.stopPropagation()}>
                <input
                    class="w-4 h-4"
                    type="checkbox"
                    checked={methods.existCheck(props.id)}
                    value={props.id}
                    onChange={(e) => {
                        const value = Number(
                            (e.target as HTMLInputElement).value
                        );
                        methods.onCheck(value);
                    }}
                />
            </div>
        ),
    },
    {
        key: "id",
        isSort: true,
    },
    {
        key: "name",
        header: "nombre",
        isSort: true,
    },
    {
        key: "father_lastname",
        header: "Apellido paterno",
        isSort: true,
    },
    {
        key: "foto",
        header: "foto",
        cell: (props) => {
            return (
                <img
                    width={80}
                    height={80}
                    class="min-w-[50px] max-w-[50px] h-[50px] rounded-sm mx-auto object-cover"
                    src={printFileUser(props.foto)[0]}
                    alt={props.name}
                />
            );
        },
    },
    {
        key: "telephone",
        header: "teléfono",
        cell: (props) =>props.telephone ? numberPhoneFormated(props.telephone):null,
    },
    {
        key: "enabled",
        header: "habilitado",
        cell: (user) => (
            <div
                class={`${
                    user.enabled ? "bg-success" : "bg-danger"
                } w-3 rounded-full h-3 mx-auto`}
            />
        ),
        isSort: true,
    },
    {
        key: "role",
        header: "Rol",
        cell: (user) => (
            <span
                class={`${icoRoleColor(
                    user.role.id
                )} px-4 py-1 rounded-md text-white`}
            >
                <i class={`fa-solid ${icoRole(user.role.id)} mr-1`} />
                {user.role.name}
            </span>
        ),
        isSort: "role_id",
    },
    {
        key: "acciones",
        cell: (props, _index) => {
            return (
                <div
                    class="flex items-center justify-center gap-1 text-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Link to={`/users/${props.slug}`}>
                        <button
                            class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-success"
                            type="button"
                            aria-label="show user"
                        >
                            <i class="fa-solid text-sm fa-eye lg:mr-1" />
                        </button>
                    </Link>
                    {authPermissionModifierGuard() ? (
                        <>
                            {authPermissionModifierGuard() &&
                            props.role.id !== 1 ? (
                                <Link to={`/users/${props.slug}/update`}>
                                    <button
                                        class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-orange-600"
                                        type="button"
                                        aria-label="edit user"
                                    >
                                        <i class="fa-solid text-sm fa-pen lg:mr-1" />
                                    </button>
                                </Link>
                            ) : null}
                        </>
                    ) : null}
                </div>
            );
        },
    },
];
export default usersColumns;
