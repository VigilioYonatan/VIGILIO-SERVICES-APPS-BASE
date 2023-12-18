import { Injectable } from "@decorators/di";
import { RolesService } from "../services/roles.service";
import { Controller, Get, Params } from "@decorators/express";
import { Pipe } from "@vigilio/express-core/valibot";
import { objectAsync, string } from "valibot";

@Injectable()
@Controller("/roles")
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get("/")
    async index() {
        const result = await this.rolesService.index();
        return result;
    }

    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Get("/:id")
    async show(@Params("id") id: string) {
        const result = await this.rolesService.show(id);
        return result;
    }
}
