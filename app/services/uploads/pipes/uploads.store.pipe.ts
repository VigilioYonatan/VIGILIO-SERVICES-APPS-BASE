import { custom, objectAsync, string } from "valibot";
import {
    UploadsEntities,
    UploadsProperties,
    uploadsEntities,
    uploadsProperties,
} from "../libs/helpers";

export const uploadsStorePipe = objectAsync({
    entity: string("Este campo es obligatorio", [
        custom((input) => uploadsEntities.includes(input as UploadsEntities)),
    ]),
    property: string("Este campo es obligatorio", [
        custom((input) =>
            uploadsProperties.includes(input as UploadsProperties)
        ),
    ]),
});
