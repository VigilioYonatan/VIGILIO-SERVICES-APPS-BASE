// import { printFileWithDimension } from "~/helpers";
// import { productsShowPage, type Product } from "../apis/products.urls";
// import { h } from "vue";
// import sweet from "@vigilio/sweet";
// import { ProductsColumnsPaginator } from "./ProductsIndex.vue";
// import { categoriesShowPage } from "@/categories/apis/categories.urls";

// export function showProductComponent(product: Product) {
//     const images = printFileWithDimension(product.images, "products", 300);
//     const html = /*html*/ `<div class="flex flex-col gap-2">
//                 <img src="${
//                     images[0]
//                 }" class="rounded-md mb-5 w-[150px] h-[150px] object-cover mx-auto" width="150" height="150" alt="${
//         product.name
//     }"/>
//     <div class="flex gap-2">
//         <div class="flex flex-col gap-1">
//             <div class="flex gap-2 items-center mb-1">
//                 <span class="text-terciary">ID:</span>
//                 <span class="dark:text-secondary-light text-secondary-dark font-bold text-lg tracking-wide">${
//                     product.id
//                 }</span>
//             </div>
//             <div class="flex gap-3 items-center">
//                 <span class="text-terciary">Name:</span>
//                 <span class="dark:text-secondary-light text-secondary-dark font-bold text-lg tracking-wide">${
//                     product.name
//                 }</span>
//             </div>
//             <div class="flex gap-3 items-center">
//                 <span class="text-terciary">Slug:</span>
//                 <span class="dark:text-secondary-light text-secondary-dark font-bold text-lg tracking-wide">${
//                     product.slug
//                 }</span>
//             </div>
//             <a target="_blank" href="${categoriesShowPage(
//                 String(product.category_id)
//             )}" class="flex gap-3 items-center">
//                 <span class="text-terciary">Categoria id:</span>
//                 <span class="dark:text-secondary-light text-secondary-dark font-bold text-lg tracking-wide hover:text-primary">${
//                     product.category_id
//                 }</span>
//             </a>
//         </div>
//         <div class="flex flex-col gap-1">
//             <div class="flex gap-2 items-center mb-1">
//                 <span class="text-terciary">Precio:</span>
//                 <span class="dark:text-secondary-light text-secondary-dark font-bold text-lg tracking-wide">${
//                     product.price
//                 }</span>
//             </div>
//             <div class="flex gap-3 items-center">
//                 <span class="text-terciary">Ilimitado:</span>
//                 <span class="dark:text-secondary-light text-secondary-dark font-bold text-lg tracking-wide">${
//                     product.ilimit === 0 ? false : true
//                 }</span>
//             </div>
//             <div class="flex gap-3 items-center">
//                 <span class="text-terciary">Stock:</span>
//                 <span class="dark:text-secondary-light text-secondary-dark font-bold text-lg tracking-wide">${
//                     product.stock
//                 }</span>
//             </div> 
//         </div>
//     </div>
//                 ${
//                     images.length > 1
//                         ? /*html*/ `<div class="flex flex-wrap gap-1 mt-2">${images.map(
//                               (img) =>
//                                   /*html*/ `<img src="${img}" width="50" height="50" class="w-[50px] h-[50px] object-cover"/>`
//                           )}
//                         </div>`
//                         : ""
//                 }</div>`;
//     return html;
// }
// export function productsImagesPaginatorComponents(): ProductsColumnsPaginator[0]["cell"] {
//     return (props) => {
//         const images = printFileWithDimension(props.images, "products", 300);

//         return h("div", { class: "relative w-[60px] h-[50px] mx-auto" }, [
//             h("img", {
//                 src: images[0],
//                 width: 100,
//                 height: 100,
//                 alt: props.name,
//                 class: "rounded-sm mx-auto w-full h-full object-cover",
//             }),
//             images.length > 1
//                 ? h(
//                       "button",
//                       {
//                           class: "absolute top-[-10px] right-0  bg-success w-[25px] h-[25px] font-bold flex justify-center items-center rounded-full text-white",
//                           "aria-label": "button to open images",
//                           onclick: (e: Event) => {
//                               e.stopPropagation();
//                               const html = /*html*/ `<div class="flex flex-col gap-4">
//                                             <span class="text-primary text-xl">Hay ${
//                                                 images.length
//                                             } imagenes</span>
//                                             <div class="flex flex-wrap justify-center gap-5 max-w-[500px]">${images.map(
//                                                 (img) =>
//                                                     /*html*/ `<img src="${img}" width="150" height="150" class="object-cover w-[150px] h-[150px] rounded-md"/>`
//                                             )}</div>
//                                         </div>`;
//                               sweet({
//                                   html,
//                               });
//                           },
//                       },
//                       `+ ${images.slice(1).length}`
//                   )
//                 : null,
//         ]);
//     };
// }
// export function productsAccionesPaginatorComponent(): ProductsColumnsPaginator[0]["cell"] {
//     return (props, _, methods) => {
//         return h(
//             "div",
//             { class: "flex items-center justify-center gap-1 text-white" },
//             [
//                 h(
//                     "a",
//                     {
//                         href: productsShowPage(props.slug),
//                         class: "px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-orange-600",
//                     },
//                     [
//                         h("i", {
//                             class: "fa-solid text-sm fa-eye lg:mr-1",
//                         }),
//                         h(
//                             "span",
//                             { class: "hidden lg:inline text-xs" },
//                             "Más información"
//                         ),
//                     ]
//                 ),
//                 h(
//                     "button",
//                     {
//                         type: "button",
//                         "aria-label": "button to delete language",
//                         onclick: (e: Event) => {
//                             e.stopPropagation();
//                             sweet({
//                                 title: "Estas seguro?",
//                                 text: `Quieres eliminar este lenguage <b>${props.name}</b>`,
//                                 icon: "warning",
//                                 showCancelButton: true,
//                                 confirmButtonText: "Si, Eliminar!",
//                             }).then((result) => {
//                                 if (result.isConfirmed) {
//                                     methods.mutate(props.id, {
//                                         onSuccess: () => {
//                                             sweet({
//                                                 icon: "success",
//                                                 title: "Success",
//                                                 text: `El lenguaje ${props.name} fue eliminado correctamente`,
//                                             });
//                                             (methods as any).refetch();
//                                         },
//                                         onError: () => {
//                                             sweet({
//                                                 icon: "danger",
//                                                 text: `El lenguaje ${props.name} no fue eliminado, comunicarse con el desarrollador`,
//                                                 title: "Error!",
//                                             });
//                                         },
//                                     });
//                                 }
//                             });
//                         },
//                         class: "px-1 py-1 lg:px-4 lg:py-2 rounded-md bg-red-600",
//                     },
//                     [
//                         h("i", {
//                             class: "fa-solid text-sm fa-trash px-1 lg:mr-1",
//                         }),
//                         h(
//                             "span",
//                             { class: "hidden lg:inline text-xs" },
//                             "Eliminar"
//                         ),
//                     ]
//                 ),
//             ]
//         );
//     };
// }
