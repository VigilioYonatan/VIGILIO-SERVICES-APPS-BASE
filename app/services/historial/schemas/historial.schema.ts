import {
    Input,
    objectAsync,
    number,
    numberAsync,
    string,
    minLength,
} from "valibot";

export const historialSchema = objectAsync({
    id: number(),
    description: string([minLength(10, "Este campo requiere 10 carácteres")]),
    product_id: numberAsync(),
    user_id: numberAsync(),
});

export type HistorialSchema = Input<typeof historialSchema> & {
    createdAt: Date;
};
export type HistorialEntitySchema = Omit<HistorialSchema, "id" | "createdAt">;
