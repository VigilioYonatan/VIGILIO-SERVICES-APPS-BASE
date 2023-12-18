import { Column, DataType, Table, Model, HasOne } from "sequelize-typescript";
import { type RolesEntitySchema } from "../schemas/roles.schema";
import { Users } from "@/users/entities/users.entity";

@Table
export class Roles extends Model implements RolesEntitySchema {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    slug: string;

    // ONE TO ONE
    @HasOne(() => Users)
    user: Users;
}
