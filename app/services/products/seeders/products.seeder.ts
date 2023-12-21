import { customArray, slug } from "@vigilio/express-core";
import { faker } from "@faker-js/faker";
import { ProductsEntitySchema } from "../schemas/products.schema";

export const productsSeeder: ProductsEntitySchema[] = customArray(100).map(
    (_, i) => {
        const name = faker.commerce.productName() + i;
        return {
            name,
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ min: 8, max: 40 })),
            ilimit: false,
            stock: Number(faker.string.numeric()),
            discount: Number(faker.string.numeric(2)),
            images: [
                {
                    dimension: 500,
                    file: faker.image.urlLoremFlickr({
                        category: "peruvian-food",
                    }),
                },
            ],
            enabled: faker.datatype.boolean(),
            slug: slug(name),
            category_id: Math.floor(Math.random() * 6) + 1,
        };
    }
);
