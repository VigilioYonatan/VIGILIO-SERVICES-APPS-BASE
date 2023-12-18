import { Input, omitAsync } from "valibot";
import { informationSchema } from "../schemas/information.schema";

export const informationStoreDto = omitAsync(informationSchema, ["id"]);
export type InformationStoreDto = Input<typeof informationStoreDto>;
