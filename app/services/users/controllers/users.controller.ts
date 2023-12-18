import { Injectable } from "@decorators/di";
import { UsersService } from "../services/users.service";
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
import { UsersStoreDto, usersStoreDto } from "../dtos/users.store.dto";
import { UsersUpdateDto, usersUpdateDto } from "../dtos/users.update.dto";
import { objectAsync, string } from "valibot";
import { PermissionAdmin } from "../../auth/guards/permissionAdmin.guard";

@Injectable()
@Controller("/users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("/")
    async index() {
        const result = await this.usersService.index();
        return result;
    }

    @Pipe(
        objectAsync({
            slug: string(),
        })
    )
    @Get("/:slug")
    async show(@Params("slug") slug: string) {
        const result = await this.usersService.show(slug);
        return result;
    }

    @PermissionAdmin()
    @Validator(usersStoreDto)
    @Status(201)
    @Post("/")
    async store(@Body() usersStoreDto: UsersStoreDto) {
        const result = await this.usersService.store(usersStoreDto);
        return result;
    }

    @PermissionAdmin()
    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Validator(usersUpdateDto)
    @Status(200)
    @Put("/:id")
    async update(
        @Params("id") id: string,
        @Body() usersUpdateDto: UsersUpdateDto
    ) {
        const result = await this.usersService.update(id, usersUpdateDto);
        return result;
    }

    @PermissionAdmin()
    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Status(201)
    @Delete("/:id")
    async destroy(@Params("id") id: string) {
        const result = await this.usersService.destroy(id);
        return result;
    }
}
