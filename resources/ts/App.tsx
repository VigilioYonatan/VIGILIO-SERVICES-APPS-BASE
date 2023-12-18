import { Router, Route, useLocation, Switch } from "wouter-preact";
import { Suspense, lazy, useEffect } from "preact/compat";
import { AuthLogin } from "@/auth/schemas/auth.schema";
import useAuthstore from "@/auth/stores/auth.store";
import AdminLayout from "@/admin/components/AdminLayout";
import { InformationSchemaFromServe } from "@/information/schemas/information.schema";
import useInformationstore from "@/information/stores/information.store";

function App({
    $user,
    $information,
}: {
    $user: AuthLogin;
    $information: InformationSchemaFromServe;
}) {
    const { onLogin, state } = useAuthstore();
    const { onInit } = useInformationstore();
    useEffect(() => {
        onInit($information);
    }, []);
    useEffect(() => {
        onLogin($user);
    }, []);
    if (!state.id) return null;

    const [location] = useLocation();

    if (!location.startsWith("/admin")) return null;

    return (
        <Router base="/admin">
            <AdminLayout>
                <Suspense fallback={null}>
                    <Switch>
                        <Route
                            path="/"
                            component={lazy(
                                () => import("@/admin/views/Dashboard")
                            )}
                        />
                        <Route
                            path="/settings"
                            component={lazy(
                                () =>
                                    import(
                                        "@/information/views/InformationUpdate"
                                    )
                            )}
                        />
                        <Route
                            path="/categories"
                            component={lazy(
                                () =>
                                    import("@/categories/views/CategoriesIndex")
                            )}
                        />
                        <Route
                            path="/categories/:slug"
                            component={lazy(
                                () =>
                                    import("@/categories/views/CategoriesShow")
                            )}
                        />
                        <Route
                            path="/categories/:slug/update"
                            component={lazy(
                                () =>
                                    import(
                                        "@/categories/views/CategoriesUpdate"
                                    )
                            )}
                        />
                        <Route
                            path="/products"
                            component={lazy(
                                () => import("@/products/views/ProductsIndex")
                            )}
                        />
                        <Route
                            path="/products/:slug"
                            component={lazy(
                                () => import("@/products/views/ProductsShow")
                            )}
                        />
                        <Route
                            path="/products/:slug/update"
                            component={lazy(
                                () => import("@/products/views/ProductsUpdate")
                            )}
                        />
                        <Route
                            path="/users"
                            component={lazy(
                                () => import("@/users/views/UsersIndex")
                            )}
                        />
                        <Route
                            path="/users/:slug"
                            component={lazy(
                                () => import("@/users/views/UsersShow")
                            )}
                        />
                        <Route
                            path="/users/:slug/update"
                            component={lazy(
                                () => import("@/users/views/UsersUpdate")
                            )}
                        />
                        <Route
                            path="/roles"
                            component={lazy(
                                () => import("@/roles/views/RolesIndex")
                            )}
                        />

                        {/* reviews */}
                        <Route
                            path="/reviews"
                            component={lazy(
                                () => import("@/reviews/views/ReviewsIndex")
                            )}
                        />
                        <Route
                            path="/reviews/:id"
                            component={lazy(
                                () => import("@/reviews/views/ReviewsShow")
                            )}
                        />
                        <Route
                            path="/reviews/:id/update"
                            component={lazy(
                                () => import("@/reviews/views/ReviewsUpdate")
                            )}
                        />
                        <Route
                            path="/plus/auth"
                            component={lazy(
                                () =>
                                    import("@/admin/views/plus/Authentication")
                            )}
                        />
                        <Route>404</Route>
                    </Switch>
                </Suspense>
            </AdminLayout>
        </Router>
    );
}

export default App;
