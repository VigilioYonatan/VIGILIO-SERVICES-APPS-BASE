import { Injectable } from "@decorators/di";
import { InformationService } from "../services/information.service";
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
import { objectAsync, string } from "valibot";
import {
    InformationStoreDto,
    informationStoreDto,
} from "../dtos/information.store.dto";
import {
    InformationUpdateDto,
    informationUpdateDto,
} from "../dtos/information.update.dto";
import { PermissionAdmin } from "@/auth/guards/permissionAdmin.guard";

@Injectable()
@Controller("/information")
export class InformationController {
    constructor(private readonly informationService: InformationService) {}

    @Get("/")
    async index() {
        const result = await this.informationService.index();
        return result;
    }

    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Get("/:id")
    async show(@Params("id") id: string) {
        const result = await this.informationService.show(id);
        return result;
    }

    @Validator(informationStoreDto)
    @Status(201)
    @Post("/")
    async store(@Body() informationStoreDto: InformationStoreDto) {
        const result = await this.informationService.store(informationStoreDto);
        return result;
    }

    @PermissionAdmin()
    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Validator(informationUpdateDto)
    @Status(201)
    @Put("/:id")
    async update(
        @Params("id") id: string,
        @Body() informationUpdateDto: InformationUpdateDto
    ) {
        const result = await this.informationService.update(
            id,
            informationUpdateDto
        );
        return result;
    }
}
