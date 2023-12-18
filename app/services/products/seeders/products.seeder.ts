import { customArray, slug } from "@vigilio/express-core";
import { faker } from "@faker-js/faker";
import { ProductsEntitySchema } from "../schemas/products.schema";

// export const productsSeeder: ProductsEntitySchema[] = customArray(100).map(
//     (_, i) => {
//         const name = faker.commerce.productName() + i;
//         return {
//             name,
//             description: faker.commerce.productDescription(),
//             price: parseFloat(faker.commerce.price({ min: 8, max: 40 })),
//             ilimit: false,
//             stock: Number(faker.string.numeric()),
//             discount: Number(faker.string.numeric(2)),
//             images: [
//                 {
//                     dimension: 500,
//                     file: faker.image.urlLoremFlickr({
//                         category: "peruvian-food",
//                     }),
//                 },
//             ],
//             enabled: faker.datatype.boolean(),
//             slug: slug(name),
//            (Math.random() * 6) + 1,
//         };
//     }
// );
export const productsSeeder: (Omit<ProductsEntitySchema, "category_id"> & {
    categoria: string;
})[] = [
    {
        name: "Samsung Galaxy S22",
        price: 1020,
        stock: 4,
        description:
            "El Samsung S22 es un potente smartphone con características avanzadas. Cuenta con una pantalla AMOLED de alta resolución, un potente procesador y una cámara versátil. ¡No te pierdas la experiencia S22!",
        slug: "samsung-s22",
        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://media.power-cdn.net/images/h-de5f69fd2455afa7718f696644837eeb/products/1264182/1264182_20_600x600_t_g.webp",
            },
        ],
        categoria: "samsung",
    },
    {
        name: "iPhone 13",
        price: 1100,
        stock: 8,
        description:
            "El iPhone 13 es el último modelo de Apple con un diseño elegante y rendimiento excepcional. Captura fotos y videos increíbles con su avanzado sistema de cámaras. Disfruta de la potencia del chip A15 Bionic.",
        slug: "iphone-13",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://ultimainformatica.com/1065488-thickbox_default/apple-iphone-13-mini-137-cm-54-sim-doble-ios-15-5g-256-gb-negro.jpg",
            },
        ],
        categoria: "apple",
    },

    {
        name: "Xiaomi Mi 11",
        price: 800,
        stock: 10,
        description:
            "El Xiaomi Mi 11 ofrece un rendimiento de primer nivel con su procesador Snapdragon 888. Disfruta de una pantalla AMOLED vibrante y un sistema de cámaras versátil. ¡Explora el mundo con Mi 11!",
        slug: "xiaomi-mi-11",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://www.kabifperu.com/imagenes/prod-14052021134133-xiaomi-mi-11-lite-6gb-128gb-azul-deta.jpg",
            },
        ],
        categoria: "xiaomi",
    },
    {
        name: "Xiaomi Redmi Note 10",
        price: 300,
        stock: 15,
        description:
            "El Xiaomi Redmi Note 10 es un smartphone asequible con un rendimiento sorprendente. Su pantalla FHD+ y la potente batería lo convierten en una excelente opción para usuarios exigentes.",
        slug: "xiaomi-redmi-note-10",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://promart.vteximg.com.br/arquivos/ids/6251957-1000-1000/image-b7699d7446e848aca6256a7a99f7ce11.jpg",
            },
        ],
        categoria: "xiaomi",
    },
    {
        name: "Xiaomi Poco X3 Pro",
        price: 400,
        stock: 12,
        description:
            "El Xiaomi Poco X3 Pro es un dispositivo potente a un precio asequible. Disfruta de un rendimiento fluido con su procesador Snapdragon 860 y una pantalla con alta tasa de refresco.",
        slug: "xiaomi-poco-x3-pro",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://xiaomioficial.pe/media/catalog/product/cache/2b88132ea045bae0fc2b44a4f558f9b1/-/_/-_imagen_56-_ce001xia97.jpg",
            },
        ],
        categoria: "xiaomi",
    },
    {
        name: "Xiaomi Mi 10T",
        price: 700,
        stock: 8,
        description:
            "El Xiaomi Mi 10T es un smartphone equilibrado con un potente conjunto de cámaras y un rendimiento excepcional. Su pantalla con tasa de refresco de 144Hz ofrece una experiencia visual suave.",
        slug: "xiaomi-mi-10t",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://allmobiles.com.pe/wp-content/uploads/2021/12/1623100882_mi-10t-2.png",
            },
        ],
        categoria: "xiaomi",
    },
    {
        name: "Samsung Galaxy S21",
        price: 1200,
        stock: 6,
        description:
            "El Samsung Galaxy S21 es el buque insignia de Samsung con un diseño elegante y potentes características. Cuenta con una pantalla Dynamic AMOLED, un versátil sistema de cámaras y un rendimiento excepcional.",
        slug: "samsung-galaxy-s21",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://http2.mlstatic.com/D_NQ_NP_717962-MLU72932984865_112023-O.webp",
            },
        ],
        categoria: "samsung",
    },
    {
        name: "Samsung Galaxy A52",
        price: 500,
        stock: 10,
        description:
            "El Samsung Galaxy A52 es un smartphone de gama media con características premium. Disfruta de una pantalla Super AMOLED, un sistema de cámaras versátil y una batería de larga duración.",
        slug: "samsung-galaxy-a52",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://promart.vteximg.com.br/arquivos/ids/7519094-1000-1000/image-3ddab7a7f9304310a5986cd11dfd6620.jpg",
            },
        ],
        categoria: "samsung",
    },
    {
        name: "Samsung Galaxy M32",
        price: 250,
        stock: 20,
        description:
            "El Samsung Galaxy M32 es un dispositivo asequible con un conjunto de funciones equilibrado. Su pantalla Super AMOLED y la potente batería lo convierten en una opción atractiva para usuarios con presupuesto limitado.",
        slug: "samsung-galaxy-m32",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://cltienemobile.com/wp-content/uploads/2022/06/descarga-1.jpg",
            },
        ],
        categoria: "samsung",
    },
    {
        name: "Samsung Galaxy Z Fold 3",
        price: 1800,
        stock: 3,
        description:
            "El Samsung Galaxy Z Fold 3 es un smartphone plegable que ofrece una experiencia única. Disfruta de la versatilidad de una pantalla plegable y un potente rendimiento en un elegante diseño.",
        slug: "samsung-galaxy-z-fold-3",

        enabled: true,
        ilimit: false,
        images: [
            {
                dimension: 500,
                file: "https://allmobiles.com.pe/wp-content/uploads/2021/12/03-samsung-galaxy-z-fold-3-buds-negro-back.png",
            },
        ],
        categoria: "samsung",
    },
];
