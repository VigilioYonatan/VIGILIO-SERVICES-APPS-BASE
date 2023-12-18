import BoxEntity from "../components/BoxEntity";
import { usersIndexApi } from "@/users/apis/users.index.api";
import { productsIndexApi } from "@/products/apis/products.index.api";

import UsersNewBox from "@/users/components/UsersNewBox";
import Loading from "../components/Loading";
import { JSX } from "preact/jsx-runtime";
import { rolesIndexApi } from "@/roles/apis/roles.index.api";

function Dashboard() {
    const queryUsers = usersIndexApi();
    const queryProducts = productsIndexApi();
    const queryRoles = rolesIndexApi();
    let component: JSX.Element | JSX.Element[] | null = null;
    if (
        queryUsers.isLoading ||
        queryProducts.isLoading ||
        queryRoles.isLoading
    ) {
        component = <Loading />;
    }
    if (queryUsers.isError || queryProducts.isError || queryRoles.isError) {
        component = (
            <div class="dark:text-secondary-light text-secondary-dark">
                Error: comunicarse con desarrollador
            </div>
        );
    }
    if (queryUsers.data && queryProducts.data) {
        component = (
            <div class="p-4 flex flex-col lg:flex-row gap-4">
                <section class="w-full">
                    <div class="flex flex-wrap gap-4">
                        <BoxEntity
                            title="Usuarios"
                            color="bg-blue-500"
                            ico={<i class="fas fa-users" />}
                            quantity={String(queryUsers.data.data.length)}
                        />
                        <BoxEntity
                            title="Roles"
                            color="bg-yellow-500"
                            ico={<i class="fas fa-user-tag" />}
                            quantity={String(queryRoles.data?.data.length)}
                        />
                        <BoxEntity
                            title="Productos"
                            color="bg-danger"
                            ico={<i class="fas fa-hamburger" />}
                            quantity={String(queryProducts.data.data.length)}
                        />
                        <BoxEntity
                            title="Ventas"
                            color="bg-success"
                            ico={<i class="fas fa-sack-dollar" />}
                            quantity={String(queryProducts.data.data.length)}
                        />
                    </div>
                    <span class="dark:text-secondary-light text-secondary-dark font-bold text-2xl">
                        Ventas
                    </span>
                </section>
                <section class="lg:w-[500px]">
                    <UsersNewBox users={queryUsers.data.data} />
                </section>
            </div>
        );
    }

    return component;
}

export default Dashboard;
