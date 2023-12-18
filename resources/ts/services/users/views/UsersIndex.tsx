import VigilioTable from "~/components/table";
import { sweetModal } from "@vigilio/sweet";
import { usersDestroyApi } from "../apis/users.destroy.api";
import { useTable } from "@vigilio/preact-table";
import { reactComponent } from "~/lib/preact";
import { useMediaQueryNoReactive } from "~/hooks/useMediaQuery";
import { usersPaginatorApi } from "@/common/paginator/apis/users.paginator.api";
import usersColumns, {
    type UsersIndexMethodsPaginator,
    type UsersIndexSecondaryPaginator,
} from "../lib/UsersColumns";
import Container from "@/admin/components/Container";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";
import { UsersSchemaFromServe } from "@/users/schemas/users.schema";
import { lazy } from "preact/compat";
import { authPermissionAdmin } from "@/auth/stores/auth.store";

/* lazy */
const UsersStore = lazy(() => import("./UsersStore"));
const UsersShow = lazy(() => import("./UsersShow"));

function UsersIndex() {
    const { mutate } = usersDestroyApi();

    const table = useTable<
        UsersSchemaFromServe,
        UsersIndexSecondaryPaginator,
        UsersIndexMethodsPaginator
    >({
        columns: usersColumns,
        methods: { mutate } as UsersIndexMethodsPaginator,
    });

    const query = usersPaginatorApi(table);
    const handleOpenUser = (user: UsersSchemaFromServe) => {
        return sweetModal({
            html: reactComponent(<UsersShow params={{ slug: user.id }} />),
            showCloseButton: true,
            sweetWidth: "800px",
            position: "start",
        });
    };

    function onUsersStore() {
        sweetModal({
            html: reactComponent(<UsersStore refetch={query.refetch} />),
            sweetWidth: "1000px",
            showCloseButton: true,
            position: useMediaQueryNoReactive("(min-width: 700px)")
                ? "center"
                : "start",
        });
    }
    function onRemoveAll(checkeds: number[]) {
        sweetModal({
            icon: "danger",
            text: `Se eliminará estas categorias con el id: ${checkeds}`,
            showCancelButton: true,
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                await Promise.all(checkeds.map((index) => mutate(index)));
                query.refetch();
                table.checks.clearChecks();
            }
        });
    }
    return (
        <Container>
            <div className="mx-1 lg:mx-6 flex flex-col gap-4">
                <AdminBreadCrumb current="usuarios" />
                <div class="">
                    {authPermissionAdmin() ? (
                        <button
                            type="button"
                            class="bg-primary px-6 py-3  text-white rounded-md font-bold text-xs uppercase shadow"
                            aria-label="button to open create new user"
                            onClick={onUsersStore}
                        >
                            <i class="fas fa-users" /> Agregar Usuario
                        </button>
                    ) : null}
                </div>
            </div>

            <div class="overflow-x-auto overflow-y-hidden">
                <VigilioTable query={query} table={table}>
                    <VigilioTable.header>
                        <VigilioTable.header.tools
                            hiddenDelete={!authPermissionAdmin()}
                            onRemoveAll={onRemoveAll}
                        />
                        <div class="flex items-center gap-1">
                            <VigilioTable.header.limit />
                            <VigilioTable.header.refetch />
                        </div>
                    </VigilioTable.header>
                    <VigilioTable.table>
                        <VigilioTable.thead>
                            <VigilioTable.thead.row>
                                <VigilioTable.thead.th />
                            </VigilioTable.thead.row>
                        </VigilioTable.thead>
                        <VigilioTable.tbody>
                            <VigilioTable.tbody.row
                                handleClick={handleOpenUser}
                            >
                                {(data) => (
                                    <VigilioTable.tbody.td data={data} />
                                )}
                            </VigilioTable.tbody.row>
                        </VigilioTable.tbody>
                    </VigilioTable.table>
                    <VigilioTable.footer>
                        <VigilioTable.footer.show />
                        <VigilioTable.footer.paginator />
                    </VigilioTable.footer>
                </VigilioTable>
            </div>
        </Container>
    );
}

export default UsersIndex;
