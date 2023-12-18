import { Injectable } from "@decorators/di";
import { Information } from "../entities/information.entity";

@Injectable()
export class InformationRepository {
    async onlypolitica() {
        return Information.scope("onlypolitica").findOne({ where: { id: 1 } });
    }
}
