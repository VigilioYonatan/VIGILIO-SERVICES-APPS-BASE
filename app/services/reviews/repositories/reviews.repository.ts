import { Injectable } from "@decorators/di";
import { Reviews } from "../entities/reviews.entity";
import { Op } from "sequelize";

@Injectable()
export class ReviewsRepository {
    customLimit(limit = 10) {
        return Reviews.findAll({
            limit,
            where: { star: { [Op.gt]: 4 } },
            order: [["createdAt", "DESC"]],
        });
    }
}
