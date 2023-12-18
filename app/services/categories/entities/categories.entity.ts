import {
    Column,
    DataType,
    Table,
    Model,
    HasOne,
    BeforeBulkCreate,
    BeforeCreate,
    BeforeUpdate,
} from "sequelize-typescript";
import { Products } from "@/products/entities/products.entity";
import { type CategoriesEntitySchema } from "../schemas/categories.schema";
import { slug } from "@vigilio/express-core/helpers";
import { ImagesSchema } from "@/uploads/schemas/uploads.schema";

@Table
export class Categories extends Model implements CategoriesEntitySchema {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    icon: string;

    @Column({
        allowNull: false,
        type: DataType.JSON,
    })
    image: ImagesSchema[];

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    slug: string;

    // one to one
    @HasOne(() => Products)
    products: Products[];

    // slug
    @BeforeUpdate
    @BeforeCreate
    static slug(category: CategoriesEntitySchema) {
        category.slug = slug(category.slug);
    }
    @BeforeBulkCreate
    static slugArray(categories: CategoriesEntitySchema[]) {
        for (const category of categories) {
            category.slug = slug(category.slug);
        }
    }
}
