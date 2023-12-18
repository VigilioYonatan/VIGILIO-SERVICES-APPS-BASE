import { type Input, omitAsync, getOutput, getPipeIssues } from "valibot";
import { Products } from "../entities/products.entity";
import {
    type ProductsSchema,
    productsSchema,
} from "../schemas/products.schema";
import { Categories } from "@/categories/entities/categories.entity";

export const productsStoreDto = omitAsync(
    productsSchema,
    ["id"],
    [
        async (input) => {
            const [byName, bySlug, byCategoryId] = await Promise.all([
                Products.findOne({
                    where: {
                        name: input.name,
                    },
                    raw: true,
                }),
                Products.findOne({
                    where: {
                        slug: input.slug,
                    },
                    raw: true,
                }),
                Categories.findByPk(input.category_id),
            ]);

            if (byName) {
                return getPipeIssues(
                    "name" as keyof ProductsSchema,
                    `Ya existe el products con el name: ${input.name}`,
                    input
                );
            }
            if (bySlug) {
                return getPipeIssues(
                    "slug" as keyof ProductsSchema,
                    `Ya existe el products con el slug: ${input.slug}`,
                    input
                );
            }
            if (!byCategoryId) {
                return getPipeIssues(
                    "category_id" as keyof ProductsSchema,
                    `No existe la categoría: ${input.category_id}`,
                    input
                );
            }
            return getOutput(input);
        },
    ]
);

export type ProductsStoreDto = Input<typeof productsStoreDto>;
