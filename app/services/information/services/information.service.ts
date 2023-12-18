import { Injectable } from "@decorators/di";
import { Information } from "../entities/information.entity";
import { BadRequestException, NotFoundException } from "@vigilio/express-core";
import { InformationStoreDto } from "../dtos/information.store.dto";
import { InformationUpdateDto } from "../dtos/information.update.dto";
import enviroments from "~/config/enviroments.config";

@Injectable()
export class InformationService {
    async index() {
        const data = await Information.findAll();
        return {
            success: true,
            data,
        };
    }
    async show(slug: string) {
        const information = await Information.findByPk(slug);

        if (!information) {
            throw new NotFoundException(
                `No se encontró un informacion con ${slug}`
            );
        }
        return {
            success: true,
            information,
        };
    }

    async store(informationStoreDto: InformationStoreDto) {
        if (enviroments.NODE_ENV === "production")
            throw new BadRequestException(
                "No está permitido en este modo de desarrollo"
            );
        const { data } = await this.index();
        if (data.length)
            throw new BadRequestException(
                "No está permitido agregar más información"
            );
        const information = new Information(informationStoreDto);
        await information.save();
        return {
            success: true,
            information,
        };
    }

    async update(id: string, informationUpdateDto: InformationUpdateDto) {
        const { information } = await this.show(id);
        await information.update(informationUpdateDto);

        return {
            success: true,
            information,
        };
    }
}
