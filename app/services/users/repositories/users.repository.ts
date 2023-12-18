import { Injectable } from "@decorators/di";
import { Users } from "../entities/users.entity";
import { Op } from "sequelize";

@Injectable()
export class UsersRepository {
    showOnlyMembers() {
        return Users.findAll({
            where: {
                especialidad: {
                    [Op.not]: null,
                },
            },
        });
    }
}
