import {
    type Rol,
    type RolesPaginatorQuery,
} from "@/common/paginator/apis/roles.paginator.api";
import {
    type Columns,
    type UseTable,
    type UseTableMethods,
} from "@vigilio/preact-table";
import { Link } from "wouter-preact";
import { authPermissionModifierGuard } from "@/auth/stores/auth.store";
import { rolesGuard } from "./helpers";

export type RolesIndexSecondaryPaginator = "acciones" | "index";
export type RolesIndexMethodsPaginator = {
    refetch: RolesPaginatorQuery["refetch"];
} & UseTableMethods<Rol, RolesIndexSecondaryPaginator>;
export type RolesColumnsPaginator = Columns<
    Rol,
    RolesIndexSecondaryPaginator,
    RolesIndexMethodsPaginator
>;
export type RolesIndexTable = UseTable<
    Rol,
    RolesIndexSecondaryPaginator,
    RolesIndexMethodsPaginator
>;
const rolesColumns: RolesColumnsPaginator = [
    {
        key: "index",
        header: (_key, methods, data) => {
            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
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
        key: "acciones",
        cell: (props, _index) => (
            <div
                class="flex items-center justify-center gap-1 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <Link to={`/roles/${props.slug}`}>
                    <button
                        class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-success"
                        type="button"
                        aria-label="show user"
                    >
                        <i class="fa-solid text-sm fa-eye lg:mr-1" />
                    </button>
                </Link>
                {authPermissionModifierGuard() && !rolesGuard(props.id) ? (
                    <>
                        <Link to={`/roles/${props.slug}/update`}>
                            <button
                                class="px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-orange-600"
                                type="button"
                                aria-label="edit rol"
                            >
                                <i class="fa-solid text-sm fa-pen lg:mr-1" />
                            </button>
                        </Link>
                    </>
                ) : null}
            </div>
        ),
    },
];
export default rolesColumns;
