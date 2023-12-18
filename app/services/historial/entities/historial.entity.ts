import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    DefaultScope,
    BelongsTo,
} from "sequelize-typescript";
import { type HistorialEntitySchema } from "../schemas/historial.schema";
import { Users } from "@/users/entities/users.entity";
import { UsersSchema } from "@/users/schemas/users.schema";
import { Products } from "@/products/entities/products.entity";
@DefaultScope(() => ({
    include: {
        model: Users,
        attributes: [
            "id",
            "name",
            "father_lastname",
            "foto",
        ] as (keyof UsersSchema)[],
    },
}))
@Table({ updatedAt: false })
export class Historial extends Model implements HistorialEntitySchema {
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    // one to one
    @ForeignKey(() => Products)
    @Column({ unique: true })
    product_id: number;

    @BelongsTo(() => Products)
    product: Products;

    // one to one
    @ForeignKey(() => Users)
    @Column({ unique: true })
    user_id: number;

    @BelongsTo(() => Users)
    user: Users;
}
