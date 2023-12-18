import { customArray } from "@vigilio/express-core";
import { faker } from "@faker-js/faker";
import { CategoriesEntitySchema } from "../schemas/categories.schema";

// export const categoriesSeeder: CategoriesEntitySchema[] = customArray(6).map(
//     (_, i) => {
//         const name = faker.person.firstName() + i;
//         return {
//             name,
//             icon: "<i class='fas fa-volume-up'></i>",
//             image: [
//                 {
//                     file: faker.image.urlLoremFlickr({
//                         category: "peruvian-food",
//                     }),
//                     dimension: 500,
//                 },
//             ],
//             slug: name,
//         };
//     }
// );
export const categoriesSeeder: CategoriesEntitySchema[] = [
    {
        name: "xiaomi",
        icon: "",
        image: [
            {
                dimension: 500,
                file: "https://xiaomiperu.com/media/seo/image/xiaomi_peru_oficial.png",
            },
        ],
        slug: "xiaomi",
    },
    {
        name: "apple",
        icon: "",
        image: [
            {
                dimension: 500,
                file: "https://1000marcas.net/wp-content/uploads/2019/11/Apple-logo.png",
            },
        ],
        slug: "apple",
    },
    {
        name: "samsung",
        icon: "",
        image: [
            {
                dimension: 500,
                file: "https://cdn.iconscout.com/icon/free/png-256/free-samsung-226432.png",
            },
        ],
        slug: "samsung",
    },
];
