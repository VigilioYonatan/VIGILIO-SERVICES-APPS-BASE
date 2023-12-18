import { Injectable } from "@decorators/di";
import { CategoriesService } from "../services/categories.service";
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
    CategoriesStoreDto,
    categoriesStoreDto,
} from "../dtos/categories.store.dto";
import {
    CategoriesUpdateDto,
    categoriesUpdateDto,
} from "../dtos/categories.update.dto";
import { objectAsync, string } from "valibot";
import { PermissionModifierAdmin } from "@/auth/guards/PermissionModifierAdmin.guard";

@Injectable()
@Controller("/categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get("/")
    async index() {
        const result = await this.categoriesService.index();
        return result;
    }

    @Pipe(
        objectAsync({
            slug: string(),
        })
    )
    @Get("/:slug")
    async show(@Params("slug") slug: string) {
        const result = await this.categoriesService.show(slug);
        return result;
    }

    @PermissionModifierAdmin()
    @Validator(categoriesStoreDto)
    @Status(201)
    @Post("/")
    async store(@Body() categoriesStoreDto: CategoriesStoreDto) {
        const result = await this.categoriesService.store(categoriesStoreDto);
        return result;
    }

    @PermissionModifierAdmin()
    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Validator(categoriesUpdateDto)
    @Status(200)
    @Put("/:id")
    async update(
        @Params("id") id: string,
        @Body() categoriesUpdateDto: CategoriesUpdateDto
    ) {
        const result = await this.categoriesService.update(
            id,
            categoriesUpdateDto
        );
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
        const result = await this.categoriesService.destroy(id);
        return result;
    }
}
