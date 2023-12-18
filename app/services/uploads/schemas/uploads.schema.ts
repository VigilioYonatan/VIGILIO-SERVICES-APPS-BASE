import { Input, number, object, string } from "valibot";

export function imagesSchema() {
    return object({ dimension: number(), file: string() });
}
export type ImagesSchema = Input<ReturnType<typeof imagesSchema>>;
