import { Injectable } from "@decorators/di";
import { Roles } from "../entities/roles.entity";
import { NotFoundException } from "@vigilio/express-core";

@Injectable()
export class RolesService {
    async index() {
        const data = await Roles.findAll();
        return {
            success: true,
            data,
        };
    }
    async show(slug: string) {
        let rol = await Roles.findOne({
            where: {
                slug,
            },
        });
        if (!rol) {
            rol = await Roles.findByPk(slug);
        }
        if (!rol) {
            throw new NotFoundException(`No se encontró un rol con ${slug}`);
        }
        return {
            success: true,
            rol,
        };
    }
}
