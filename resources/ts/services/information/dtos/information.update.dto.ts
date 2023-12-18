import { Input, array, instance, object, omit, optional } from "valibot";
import { informationSchema } from "../schemas/information.schema";
import validFileValibot from "~/lib/valibot";

export const informationUpdateDto = omit(informationSchema, ["logo", "id"]);
export type InformationUpdateDto = Input<typeof informationUpdateDto>;
export const informationLogoUpdateDto = object({
    logo: optional(
        array(instance(File), [
            validFileValibot({
                required: false,
                min: 1,
                max: 1,
            }),
        ])
    ),
});
export type InformationLogoUpdateDto = Input<typeof informationLogoUpdateDto>;
