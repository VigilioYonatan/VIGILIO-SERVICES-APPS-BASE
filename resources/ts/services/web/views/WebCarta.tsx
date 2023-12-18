import { categoriesIndexApi } from "@/categories/apis/categories.index.api";
import { productsIndexApi } from "@/products/apis/products.index.api";
import { useSignal } from "@preact/signals";
import { subtotal } from "@/cart/libs/helpers";
import { formatMoneyVigilio } from "~/lib/helpers";
import usePaginationNoApi from "~/hooks/usePaginationNoApi";
import Hr from "../components/Hr";
import LogoImage from "~/components/LogoImage";
import { useEffect } from "preact/hooks";
import useInformationstore from "@/information/stores/information.store";

function WebCarta() {
    const categoriesIndexApiQuery = categoriesIndexApi();
    const { state } = useInformationstore();

    const id = useSignal<null | number>(null);

    function changeCategoryId(categoryId: number) {
        id.value = categoryId;
    }

    let componentCategories = null;

    if (categoriesIndexApiQuery.isLoading) {
        componentCategories = (
            <p class="col-span-full text-center dark:text-secondary-light text-secondary-dark">
                Cargando...
            </p>
        );
    }
    if (categoriesIndexApiQuery.isError) {
        componentCategories = (
            <p class="col-span-full text-center dark:text-secondary-light text-secondary-dark">
                error
            </p>
        );
    }
    if (categoriesIndexApiQuery.isSuccess && categoriesIndexApiQuery.data) {
        const categories = categoriesIndexApiQuery.data.data;
        componentCategories = (
            <>
                <div class="web-carta flex items-center gap-6  justify-center  overflow-auto w-full  ">
                    {categories.map((category) => (
                        <button
                            type="button"
                            aria-label="button to category"
                            class={`${
                                id.value === category.id
                                    ? "border-b-2 border-primary "
                                    : categories[0].id === category.id &&
                                      !id.value
                                    ? "border-b-2 border-primary "
                                    : ""
                            } flex gap-2 pb-1  `}
                            key={category.id}
                            onClick={() => changeCategoryId(category.id)}
                        >
                            <div
                                class={`${
                                    id.value === category.id
                                        ? "text-primary "
                                        : categories[0].id === category.id &&
                                          !id.value
                                        ? "text-primary "
                                        : ""
                                } flex-col flex text-black dark:text-secondary-light`}
                            >
                                <i class="fa-thin fa-chart-pyramid" />
                                <span class="font-bold text-xs lg:text-sm">
                                    {category.name}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <ProductsByCategoryID
                    id={id.value || categoriesIndexApiQuery.data.data[0].id}
                />
                <style jsx>{`
                    .web-carta::-webkit-scrollbar {
                        height: 2px;
                    }
                    .web-carta::-webkit-scrollbar-thumb:horizontal {
                        background-color: rgba(0, 0, 0, 0.4);
                    }
                `}</style>
            </>
        );
    }
    return (
        <div class="py-2 px-2 lg:px-6 bg-background-light dark:bg-paper-dark max-w-[850px]  mx-auto text-start">
            <div class="flex flex-col min-h-[600px] sm:gap-3 justify-center items-center border border-dashed border-primary lg:p-4 p-1 ">
                <span class="font-pacifico text-xl lg:text-3xl text-primary relative inline-block after:absolute after:content-[''] after:w-[50px] after:h-[2px] after:top-[50%] after:right-[-55px] after:mt-[-1px] after:bg-primary before:absolute before:content-[''] before:w-[50px] before:h-[2px] before:top-[50%] before:left-[-55px] before:mt-[-1px] before:bg-primary">
                    Carta
                </span>
                <h3 class="font-vigilio-title text-black dark:text-secondary-light">
                    Bienvenido a <b class="text-primary">{state.name}</b>
                </h3>
                {componentCategories}
                <LogoImage />
            </div>
        </div>
    );
}

interface ProductsByCategoryIDProps {
    id: number;
}
function ProductsByCategoryID({ id }: ProductsByCategoryIDProps) {
    const productsIndexApiQuery = productsIndexApi();

    let componentProductByCategoryID = null;

    if (productsIndexApiQuery.isSuccess && productsIndexApiQuery.data) {
        const productsIndexApiQueryFilter =
            productsIndexApiQuery.data.data.filter(
                (product) => product.category_id === id
            );
        const { paginatedProducts, methods, computeds } = usePaginationNoApi({
            array: productsIndexApiQueryFilter,
            pageSize: 6,
        });

        useEffect(() => {
            /* si cambia la categoria enviarme a la pagina 1 */
            methods.onInitialPage();
        }, [id]);
        componentProductByCategoryID = (
            <div class="flex flex-col gap-2 relative min-h-[500px] ">
                {productsIndexApiQueryFilter.length ? (
                    <>
                        {!computeds.isPageInitial ? (
                            <button
                                arial-label="change page"
                                class="absolute -bottom-14  right-14   bg-primary text-2xl text-white rounded-full w-[50px] flex justify-center items-center h-[50px] shadow "
                                type="button"
                                onClick={methods.onPreviousPage}
                            >
                                <i class="fa-solid fa-caret-left" />
                            </button>
                        ) : null}

                        {paginatedProducts.map((product) => (
                            <div class="w-full">
                                <button
                                    type="button"
                                    aria-label="button to Open plate"
                                    class="flex  p-2  rounded-sm  justify-between w-full"
                                    key={product.id}
                                >
                                    <div class="flex gap-2 justify-between w-full">
                                        <div class="flex flex-col gap-1 w-full">
                                            <span class="  group-hover:text-white text-primary text-center font-vigilio-subtitle  line-clamp-2">
                                                {product.name}
                                            </span>
                                            <span class="text-xs sm:text-sm dark:text-secondary-light  line-clamp-2 sm:text-start">
                                                {product.description}
                                            </span>
                                        </div>
                                        <span class="text-black dark:text-secondary-light sm:text-2xl font-bold lg:text-xl whitespace-nowrap lg:self-end group-hover:text-black">
                                            {formatMoneyVigilio(
                                                subtotal(
                                                    Number(product.price),
                                                    Number(product.discount)
                                                )
                                            )}
                                        </span>
                                    </div>
                                </button>
                                <Hr />
                            </div>
                        ))}
                        {!computeds.isPageFinal ? (
                            <button
                                arial-label="change page"
                                class="absolute shadow -bottom-14 right-0   bg-primary text-2xl text-white rounded-full w-[50px] flex justify-center items-center h-[50px] "
                                type="button"
                                onClick={methods.onNextPage}
                            >
                                <i class="fa-solid fa-caret-right" />
                            </button>
                        ) : null}
                    </>
                ) : (
                    <span class="col-span-full text-center dark:text-secondary-light text-secondary-dark my-12 ">
                        No se encontró productos en esta categoría
                    </span>
                )}
            </div>
        );
    }

    return componentProductByCategoryID;
}

export default WebCarta;
