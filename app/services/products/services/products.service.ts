import { Injectable } from "@decorators/di";
import { Products } from "../entities/products.entity";
import {
    BadRequestException,
    NotFoundException,
} from "@vigilio/express-core/handler";
import { ProductsStoreDto } from "../dtos/products.store.dto";
import { ProductsUpdateDto } from "../dtos/products.update.dto";
import { removeFile } from "@/uploads/libs/helpers";
import { Op } from "sequelize";

@Injectable()
export class ProductsService {
    async index() {
        const data = await Products.findAll();
        return {
            success: true,
            data,
        };
    }

    async show(slug: string) {
        let product = await Products.findOne({
            where: {
                slug,
            },
        });
        if (!product) {
            product = await Products.findByPk(slug);
        }
        if (!product)
            throw new NotFoundException(
                `No se encontró un producto con ${slug}`
            );
        return {
            success: true,
            product,
        };
    }

    async store(productsStoreDto: ProductsStoreDto) {
        const product = new Products(productsStoreDto);
        await product.save();

        return {
            success: true,
            product,
        };
    }

    async update(id: string, productsUpdateDto: ProductsUpdateDto) {
        const { product } = await this.show(id);
        const [existByName, existBySlug] = await Promise.all([
            Products.findOne({
                where: {
                    name: productsUpdateDto.name,
                    id: { [Op.not]: id },
                },
                raw: true,
            }),
            Products.findOne({
                where: {
                    slug: productsUpdateDto.name,
                    id: { [Op.not]: id },
                },
                raw: true,
            }),
        ]);
        if (existByName) {
            throw new BadRequestException(
                `Este producto con el nombre ${productsUpdateDto.name} ya existe`
            );
        }
        if (existBySlug) {
            throw new BadRequestException(
                `Este producto con el slug ${productsUpdateDto.name} ya existe`
            );
        }

        await product.update(productsUpdateDto);
        return {
            success: true,
            product,
        };
    }

    async destroy(id: string) {
        const { product } = await this.show(id);
        removeFile(product.images, "products");
        await product.destroy();
        return {
            success: true,
            message: `El producto con el id ${id} fue eliminado`,
        };
    }
}
