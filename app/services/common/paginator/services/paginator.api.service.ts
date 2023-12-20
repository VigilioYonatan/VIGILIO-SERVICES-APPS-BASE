import { Injectable } from "@decorators/di";
import { InternalServerErrorException } from "@vigilio/express-core";
import { type PaginatorModel } from "../libs";
import { Op, fn, col } from "sequelize";
import { Products } from "@/products/entities/products.entity";
import { Users } from "@/users/entities/users.entity";
import { Categories } from "@/categories/entities/categories.entity";
import { Roles } from "@/roles/entities/roles.entity";
import { Reviews } from "@/reviews/entities/reviews.entity";

@Injectable()
export class PaginatorApiServices {
    async index(props: {
        model: PaginatorModel;
        query: {
            offset: number;
            limit: number;
            search: string;
        };
    }) {
        const { limit = 20, offset = 0, search = "", ...rest } = props.query;
        const offsetConverted = Number(offset);
        const limitConverted = Number(limit);
        let data = null;
        const searchLowerCase = `${search.toLowerCase()}%`;
        switch (props.model) {
            case "products":
                data = await Promise.all([
                    Products.findAll({
                        offset: offsetConverted,
                        limit: limitConverted,
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                        order: Object.entries(rest),
                    }),
                    Products.count({
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                    }),
                ]);
                break;
            case "categories":
                data = await Promise.all([
                    Categories.findAll({
                        offset: offsetConverted,
                        limit: limitConverted,
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                        order: Object.entries(rest),
                    }),
                    Categories.count({
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                    }),
                ]);
                break;
            case "users":
                data = await Promise.all([
                    Users.findAll({
                        offset: offsetConverted,
                        limit: limitConverted,
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                        order: Object.entries(rest),
                    }),
                    Users.count({
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                    }),
                ]);
                break;
            case "roles":
                data = await Promise.all([
                    Roles.findAll({
                        offset: offsetConverted,
                        limit: limitConverted,
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                        order: Object.entries(rest),
                    }),
                    Roles.count({
                        where: {
                            name: {
                                [Op.iLike]: searchLowerCase,
                            },
                        },
                    }),
                ]);
                break;
            case "reviews":
                data = await Promise.all([
                    Reviews.findAll({
                        offset: offsetConverted,
                        limit: limitConverted,
                        order: Object.entries(rest),
                    }),
                    Reviews.count({}),
                ]);
                break;
            default:
                throw new InternalServerErrorException(
                    "Comunicarse con el desarrollador"
                );
        }
        const next = `/api/paginator/${props.model}?offset=${
            offsetConverted + limitConverted
        }&limit=${limitConverted}`;
        const offsetTotal = offsetConverted - limitConverted;
        const back = `/api/paginator/${props.model}?offset=${offsetTotal}&limit=${limitConverted}`;

        return {
            success: true,
            count: data[1],
            next,
            previous: offsetTotal >= 0 ? back : null,
            results: data[0],
        };
    }
}
