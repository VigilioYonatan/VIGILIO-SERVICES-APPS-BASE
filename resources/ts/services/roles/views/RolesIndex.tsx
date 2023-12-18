import VigilioTable from "~/components/table";
import { useTable } from "@vigilio/preact-table";
import {
    type Rol,
    rolesPaginatorApi,
} from "@/common/paginator/apis/roles.paginator.api";
import rolesColumns, {
    type RolesIndexMethodsPaginator,
    type RolesIndexSecondaryPaginator,
} from "../lib/RolesColumns";
import Container from "@/admin/components/Container";
import AdminBreadCrumb from "@/admin/components/AdminBreadCrumb";

function RolesIndex() {
    const table = useTable<
        Rol,
        RolesIndexSecondaryPaginator,
        RolesIndexMethodsPaginator
    >({
        columns: rolesColumns,
    });

    const query = rolesPaginatorApi(table);

    return (
        <Container>
            <div className="mx-1 lg:mx-6 flex flex-col gap-4">
                <AdminBreadCrumb current="roles" />
            </div>
            <div class="overflow-auto">
                <VigilioTable query={query} table={table}>
                    <VigilioTable.table>
                        <VigilioTable.thead>
                            <VigilioTable.thead.row>
                                <VigilioTable.thead.th />
                            </VigilioTable.thead.row>
                        </VigilioTable.thead>
                        <VigilioTable.tbody>
                            <VigilioTable.tbody.row>
                                {(data) => (
                                    <VigilioTable.tbody.td data={data} />
                                )}
                            </VigilioTable.tbody.row>
                        </VigilioTable.tbody>
                    </VigilioTable.table>
                    <VigilioTable.footer>
                        <VigilioTable.footer.paginator />
                        <VigilioTable.footer.show />
                    </VigilioTable.footer>
                </VigilioTable>
            </div>
        </Container>
    );
}

export default RolesIndex;
