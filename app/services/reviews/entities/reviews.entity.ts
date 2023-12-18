import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    DefaultScope,
    BelongsTo,
} from "sequelize-typescript";
import { type ReviewsEntitySchema } from "../schemas/reviews.schema";
import { Users } from "@/users/entities/users.entity";
import { UsersSchema } from "@/users/schemas/users.schema";
import { ImagesSchema } from "@/uploads/schemas/uploads.schema";
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
@Table
export class Reviews extends Model implements ReviewsEntitySchema {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;
    @Column({
        type: DataType.STRING,
    })
    lastname: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    review: string;

    @Column({
        allowNull: false,
        type: DataType.DECIMAL(10, 2),
    })
    star: number;

    @Column({
        type: DataType.JSON,
    })
    foto: ImagesSchema[] | null;

    // one to one
    @ForeignKey(() => Users)
    @Column({ unique: true, allowNull: true })
    user_id: number;

    @BelongsTo(() => Users)
    user: Users;
}
