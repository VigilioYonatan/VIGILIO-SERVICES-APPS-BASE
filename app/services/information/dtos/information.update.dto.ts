import { Input, omitAsync } from "valibot";
import { informationSchema } from "../schemas/information.schema";

export const informationUpdateDto = omitAsync(informationSchema, [
    "id",
    "logo",
]);
export type InformationUpdateDto = Input<typeof informationUpdateDto>;
