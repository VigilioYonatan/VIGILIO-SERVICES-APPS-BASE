import { Injectable } from "@decorators/di";
import { Categories } from "../entities/categories.entity";
import {
    BadRequestException,
    NotFoundException,
} from "@vigilio/express-core/handler";
import { CategoriesStoreDto } from "../dtos/categories.store.dto";
import { CategoriesUpdateDto } from "../dtos/categories.update.dto";
import { removeFile } from "@/uploads/libs/helpers";

@Injectable()
export class CategoriesService {
    async index() {
        const data = await Categories.findAll();
        return {
            success: true,
            data,
        };
    }

    async show(slug: string) {
        try {
            let category = await Categories.findOne({
                where: {
                    slug,
                },
            });
            if (!category) {
                category = await Categories.findByPk(slug);
            }
            return {
                success: true,
                category: category as Categories,
            };
        } catch (error) {
            throw new NotFoundException(
                `No se encontró un categoría con ${slug}`
            );
        }
    }

    async store(categorysStoreDto: CategoriesStoreDto) {
        const category = new Categories(categorysStoreDto);
        await category.save();

        return {
            success: true,
            category,
        };
    }

    async update(id: string, categorysUpdateDto: CategoriesUpdateDto) {
        const { category } = await this.show(id);
        if (category.name === categorysUpdateDto.name)
            throw new BadRequestException(
                `Este categoría con el name ${categorysUpdateDto.name} ya existe`,
                { body: "name" }
            );
        if (category.slug === categorysUpdateDto.slug) {
            throw new BadRequestException(
                `Este categoría con el slug ${categorysUpdateDto.name} ya existe`,
                { body: "slug" }
            );
        }
        await category.update(categorysUpdateDto);
        return {
            success: true,
            category,
        };
    }

    async destroy(id: string) {
        const { category } = await this.show(id);
        removeFile(category.image, "categories");

        await category.destroy();
        return {
            success: true,
            message: `La categoría con el id ${id} fue eliminado`,
        };
    }
}
