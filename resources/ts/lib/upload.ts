import { Input, number, object, string } from "valibot";
import enviroments from "~/config";

export function imagesSchema() {
    return object({ dimension: number(), file: string() });
}

export type ImagesSchema = Input<ReturnType<typeof imagesSchema>>;
export function printFileWithDimension(
    images: { file: string; dimension: number }[],
    entity: string,
    dimension: number
) {
    return images
        .filter((img) => img.dimension === dimension)
        .map((file) =>
            file.file.startsWith("https://")
                ? file.file
                : `${enviroments.VITE_URL}/images/${entity}/${file.file}`
        );
}
