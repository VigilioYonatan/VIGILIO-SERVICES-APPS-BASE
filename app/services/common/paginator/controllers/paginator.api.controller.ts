import { Controller, Get, Params, Req } from "@decorators/express";
import { Injectable } from "@decorators/di";
import { type PaginatorModel, paginatorModel } from "../libs";
import { PaginatorApiServices } from "../services/paginator.api.service";
import { Request } from "express";
import { Pipe } from "@vigilio/express-core/valibot";
import { custom, objectAsync, string } from "valibot";

@Controller("/paginator")
@Injectable()
export class PaginatorApiController {
    constructor(private readonly paginatorApiServices: PaginatorApiServices) {}

    @Pipe(
        objectAsync({
            model: string([
                custom(
                    (val) => paginatorModel.includes(val as PaginatorModel),
                    "Modelo no válido"
                ),
            ]),
        })
    )
    @Get("/:model")
    async index(@Params("model") model: PaginatorModel, @Req() req: Request) {
        const query = req.query as unknown as {
            offset: number;
            limit: number;
            search: string;
        } & Record<string, string>;
        return await this.paginatorApiServices.index({
            model,
            query,
        });
    }
}
