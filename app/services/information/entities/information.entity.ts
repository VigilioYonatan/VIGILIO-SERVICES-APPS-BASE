import { Column, DataType, Table, Model, Scopes } from "sequelize-typescript";
import { type InformationEntitySchema } from "../schemas/information.schema";
import { ImagesSchema } from "@/uploads/schemas/uploads.schema";

@Scopes(() => ({
    onlypolitica: { attributes: ["politica"], raw: true },
}))
@Table
export class Information extends Model implements InformationEntitySchema {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.TEXT,
    })
    mapa: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    telephoneFirst: string;

    @Column({
        type: DataType.STRING,
    })
    telephoneSecond: string;

    @Column({
        type: DataType.STRING,
    })
    telephoneThird: string;

    @Column({
        type: DataType.JSON,
    })
    logo: ImagesSchema[] | null;

    @Column({
        type: DataType.STRING,
    })
    tiktok: string;

    @Column({
        type: DataType.STRING,
    })
    instagram: string;

    @Column({
        type: DataType.STRING,
    })
    twitter: string;

    @Column({
        type: DataType.STRING,
    })
    youtube: string;

    @Column({
        type: DataType.TEXT,
    })
    about: string;

    @Column({
        type: DataType.STRING,
    })
    facebook: string;

    @Column({
        type: DataType.TEXT,
    })
    politica: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    enabled: boolean;
}
