import { customArray } from "@vigilio/express-core";
import { faker } from "@faker-js/faker";
import { CategoriesEntitySchema } from "../schemas/categories.schema";

export const categoriesSeeder: CategoriesEntitySchema[] = customArray(6).map(
    (_, i) => {
        const name = faker.person.firstName() + i;
        return {
            name,
            icon: "<i class='fas fa-volume-up'></i>",
            image: [
                {
                    file: faker.image.urlLoremFlickr({
                        category: "peruvian-food",
                    }),
                    dimension: 500,
                },
            ],
            slug: name,
        };
    }
);
