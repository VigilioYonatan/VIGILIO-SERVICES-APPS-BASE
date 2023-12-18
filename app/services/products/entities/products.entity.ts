import {
    Column,
    DataType,
    Table,
    Model,
    BelongsTo,
    ForeignKey,
    Scopes,
    DefaultScope,
} from "sequelize-typescript";
import { ProductsEntitySchema } from "../schemas/products.schema";
import { Categories } from "@/categories/entities/categories.entity";
import { type CategoriesSchema } from "@/categories/schemas/categories.schema";
import { ImagesSchema } from "@/uploads/schemas/uploads.schema";

@DefaultScope(() => ({
    include: {
        model: Categories,
        attributes: ["id", "name"] as (keyof CategoriesSchema)[],
    },
}))
@Scopes(() => ({
    latestOffer: {
        where: { enabled: true },
        order: [["id", "ASC"]],
        limit: 12,
        include: {
            model: Categories,
            attributes: ["id", "name"] as (keyof CategoriesSchema)[],
        },
    },
}))
@Table
export class Products extends Model implements ProductsEntitySchema {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
    })
    description: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    images: ImagesSchema[];

    @Column({
        type: DataType.INTEGER,
    })
    stock: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
    })
    discount: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    ilimit: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    enabled: boolean;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    slug: string;

    @ForeignKey(() => Categories)
    @Column({ allowNull: false })
    category_id: number;

    @BelongsTo(() => Categories)
    categories: Categories[];
}
