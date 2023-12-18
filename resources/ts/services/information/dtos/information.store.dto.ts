import validFileValibot from "~/lib/valibot";
import { informationSchema } from "../schemas/information.schema";
import { Input, array, instance, merge, object, omit, optional } from "valibot";

export const informationStoreDto = merge([
    omit(informationSchema, ["id", "logo"]),
    object({
        logo: optional(
            array(instance(File), [
                validFileValibot({
                    required: false,
                    min: 1,
                    max: 1,
                }),
            ])
        ),
    }),
]);
export type InformationStoreDto = Input<typeof informationStoreDto>;
