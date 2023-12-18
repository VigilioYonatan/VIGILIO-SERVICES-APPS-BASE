import { Input, omitAsync } from "valibot";
import { historialSchema } from "../schemas/historial.schema";

export const historialUpdateDto = omitAsync(historialSchema, ["id"]);

export type HistorialUpdateDto = Input<typeof historialUpdateDto>;
