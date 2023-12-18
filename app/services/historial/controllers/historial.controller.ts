import { Injectable } from "@decorators/di";
import { HistorialService } from "../services/historial.service";
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
    HistorialStoreDto,
    historialStoreDto,
} from "../dtos/historial.store.dto";
import {
    HistorialUpdateDto,
    historialUpdateDto,
} from "../dtos/historial.update.dto";
import { objectAsync, string } from "valibot";

@Injectable()
@Controller("/historial")
export class HistorialController {
    constructor(private readonly historialService: HistorialService) {}

    @Get("/")
    async index() {
        const result = await this.historialService.index();
        return result;
    }

    @Pipe(
        objectAsync({
            slug: string(),
        })
    )
    @Get("/:slug")
    async show(@Params("slug") slug: string) {
        const result = await this.historialService.show(slug);
        return result;
    }

    @Validator(historialStoreDto)
    @Status(201)
    @Post("/")
    async store(@Body() historialStoreDto: HistorialStoreDto) {
        const result = await this.historialService.store(historialStoreDto);
        return result;
    }

    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Validator(historialUpdateDto)
    @Status(200)
    @Put("/:id")
    async update(
        @Params("id") id: string,
        @Body() historialUpdateDto: HistorialUpdateDto
    ) {
        const result = await this.historialService.update(
            id,
            historialUpdateDto
        );
        return result;
    }

    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Status(201)
    @Delete("/:id")
    async destroy(@Params("id") id: string) {
        const result = await this.historialService.destroy(id);
        return result;
    }
}
