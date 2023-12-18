import { Input, getOutput, omitAsync, getPipeIssues } from "valibot";
import { Categories } from "../entities/categories.entity";
import { categoriesSchema } from "../schemas/categories.schema";

export const categoriesStoreDto = omitAsync(
    categoriesSchema,
    ["id"],
    [
        async (input) => {
            const [byName, bySlug] = await Promise.all([
                Categories.findOne({
                    where: {
                        name: input.name,
                    },
                    raw: true,
                }),
                Categories.findOne({
                    where: {
                        slug: input.slug,
                    },
                    raw: true,
                }),
            ]);

            if (byName) {
                return getPipeIssues(
                    "name",
                    `Ya existe la categoría con el name: ${input.name}`,
                    input
                );
            }
            if (bySlug) {
                return getPipeIssues(
                    "slug",
                    `Ya existe la categoria con el slug: ${input.slug}`,
                    input
                );
            }
            return getOutput(input);
        },
    ]
);
export type CategoriesStoreDto = Input<typeof categoriesStoreDto>;
