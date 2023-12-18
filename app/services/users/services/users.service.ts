import { Injectable } from "@decorators/di";
import { Users } from "../entities/users.entity";
import {
    BadRequestException,
    NotFoundException,
} from "@vigilio/express-core/handler";
import { UsersStoreDto } from "../dtos/users.store.dto";
import { UsersUpdateDto } from "../dtos/users.update.dto";
import { Op } from "sequelize";
import { removeFile } from "@/uploads/libs/helpers";

@Injectable()
export class UsersService {
    async index() {
        const data = await Users.findAll();
        return {
            success: true,
            data,
        };
    }

    async show(slug: string) {
        let user = await Users.findOne({
            where: {
                slug,
            },
        });
        if (!user) {
            user = await Users.findByPk(slug);
        }
        if (!user)
            throw new NotFoundException(
                `No se encontró un un usuario con ${slug}`
            );
        return {
            success: true,
            user,
        };
    }

    async store(usersStoreDto: UsersStoreDto) {
        const user = new Users(usersStoreDto);
        await user.save();
        return {
            success: true,
            user,
        };
    }

    async update(id: string, usersUpdateDto: UsersUpdateDto) {
        const { user } = await this.show(id);
        const [byEmail, byDni, bySlug] = await Promise.all([
            Users.findOne({
                where: {
                    email: usersUpdateDto.email,
                    id: { [Op.not]: id },
                },
                raw: true,
            }),
            Users.findOne({
                where: {
                    dni: usersUpdateDto.dni,
                    id: { [Op.not]: id },
                },
                raw: true,
            }),
            Users.findOne({
                where: {
                    slug: usersUpdateDto.slug,
                    id: { [Op.not]: id },
                },
                raw: true,
            }),
        ]);
        if (byEmail) {
            throw new BadRequestException(
                `Este usuario con el correo electrónico: ${usersUpdateDto.email} ya existe`,
                { body: "email" }
            );
        }
        if (byDni) {
            throw new BadRequestException(
                `Este usuario con el dni: ${usersUpdateDto.dni} ya existe`,
                { body: "dni" }
            );
        }
        if (bySlug) {
            throw new BadRequestException(
                `Este usuario con el slug: ${usersUpdateDto.slug} ya existe`,
                { body: "slug" }
            );
        }

        await user.update(usersUpdateDto);
        return {
            success: true,
            user,
        };
    }

    async destroy(id: string) {
        const { user } = await this.show(id);
        if (user.foto) {
            removeFile(user.foto, "users");
        }
        await user.destroy();
        return {
            success: true,
            user,
        };
    }
}
