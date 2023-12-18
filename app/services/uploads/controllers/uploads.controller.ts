import { Controller, Params, Patch, Post, Req } from "@decorators/express";
import { Request } from "express";
import { File } from "formidable";
import { Upload } from "@vigilio/express-core";
import { Pipe } from "@vigilio/express-core/valibot";
import { Injectable } from "@decorators/di";
import { UploadsService } from "../services/uploads.service";
import { uploadsStorePipe } from "../pipes/uploads.store.pipe";
import { UploadsEntities, UploadsProperties } from "../libs/helpers";

@Injectable()
@Controller("/uploads")
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}
    @Pipe(uploadsStorePipe)
    @Upload()
    @Post("/:entity/:property")
    store(
        @Params("entity")
        entity: UploadsEntities,
        @Params("property") property: UploadsProperties,
        @Req() req: Request & { files: File[]; filesName?: string }
    ) {
        const { files, filesName } = req;
        const result = this.uploadsService.store({
            files,
            name: filesName,
            property,
            entity,
        });
        return result;
    }

    @Upload()
    @Patch("/:entity/:property/:id")
    update(
        @Params("entity") entity: UploadsEntities,
        @Params("id") id: string,
        @Params("property") property: UploadsProperties,
        @Req() req: Request & { files: File[]; filesName?: string }
    ) {
        const { files, filesName } = req;
        const result = this.uploadsService.update({
            files,
            name: filesName,
            id,
            property,
            entity,
        });
        return result;
    }
}
