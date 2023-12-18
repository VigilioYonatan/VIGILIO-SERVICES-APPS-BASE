import {
    Column,
    DataType,
    Table,
    Model,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    DefaultScope,
    BeforeBulkCreate,
    HasOne,
} from "sequelize-typescript";
import { type UsersEntitySchema } from "../schemas/users.schema";
import { Roles } from "@/roles/entities/roles.entity";
import { genSaltSync, hashSync } from "bcryptjs";
import { slug } from "@vigilio/express-core";
import { RolesSchema } from "@/roles/schemas/roles.schema";
import { ImagesSchema } from "@/uploads/schemas/uploads.schema";
import { Reviews } from "@/reviews/entities/reviews.entity";

@DefaultScope(() => ({
    include: {
        model: Roles,
        attributes: ["id", "name"] as (keyof RolesSchema)[],
    },
}))
@Table
export class Users extends Model implements UsersEntitySchema {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    father_lastname: string;

    @Column({
        type: DataType.STRING,
    })
    mother_lastname: string;

    @Column({
        unique: true,
        type: DataType.STRING,
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    password: string;

    @Column({
        type: DataType.STRING,
    })
    address: string;

    @Column({
        unique: true,
        type: DataType.STRING,
    })
    dni: string;

    @Column({
        type: DataType.DATE,
    })
    birthday: Date;

    @Column({
        type: DataType.JSON,
    })
    map: { lat: number; lng: number };

    @Column({
        type: DataType.STRING,
    })
    telephone: string;
    @Column({
        type: DataType.STRING,
    })
    especialidad: string;

    @Column({
        type: DataType.STRING,
    })
    google: string;

    @Column({
        type: DataType.JSON,
    })
    foto: ImagesSchema[] | null;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    enabled: boolean;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    slug: string;

    /* RELATIONS */
    // ONE TO ONE
    @ForeignKey(() => Roles)
    @Column({ allowNull: false })
    role_id: number;

    @BelongsTo(() => Roles)
    role: Roles;

    // ONE TO ONE
    @HasOne(() => Reviews)
    review: Reviews;

    /* METHODS */
    @BeforeCreate
    static hashPassword(user: UsersEntitySchema) {
        user.password = hashSync(user.password, genSaltSync(10));
    }

    @BeforeBulkCreate
    static hashPasswordArray(users: UsersEntitySchema[]) {
        for (const user of users) {
            user.password = hashSync(user.password, genSaltSync(10));
        }
    }

    @BeforeCreate
    static slug(user: UsersEntitySchema) {
        user.slug = slug(`${user.name}${Date.now().toString(32).slice(4)}`);
    }
}
