import { Injectable } from "@decorators/di";
import { ProductsService } from "../services/products.service";
import {
    Body,
    Controller,
    Delete,
    Get,
    Params,
    Post,
    Put,
    Status,
} from "@decorators/express";
import { Pipe, Validator } from "@vigilio/express-core/valibot";
import {
    type ProductsStoreDto,
    productsStoreDto,
} from "../dtos/products.store.dto";
import {
    ProductsUpdateDto,
    productsUpdateDto,
} from "../dtos/products.update.dto";
import { objectAsync, string } from "valibot";
import { PermissionModifierAdmin } from "@/auth/guards/PermissionModifierAdmin.guard";

@Injectable()
@Controller("/products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("/")
    async index() {
        const result = await this.productsService.index();
        return result;
    }

    @Pipe(
        objectAsync({
            slug: string(),
        })
    )
    @Get("/:slug")
    async show(@Params("slug") slug: string) {
        const result = await this.productsService.show(slug);
        return result;
    }

    @PermissionModifierAdmin()
    @Validator(productsStoreDto)
    @Status(201)
    @Post("/")
    async store(@Body() productsStoreDto: ProductsStoreDto) {
        const result = await this.productsService.store(productsStoreDto);
        return result;
    }

    @PermissionModifierAdmin()
    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Validator(productsUpdateDto)
    @Status(201)
    @Put("/:id")
    async update(
        @Params("id") id: string,
        @Body() productsUpdateDto: ProductsUpdateDto
    ) {
        const result = await this.productsService.update(id, productsUpdateDto);
        return result;
    }

    @PermissionModifierAdmin()
    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Status(201)
    @Delete("/:id")
    async destroy(@Params("id") id: string) {
        const result = await this.productsService.destroy(id);
        return result;
    }
}
