import { Injectable } from "@decorators/di";
import { Historial } from "../entities/historial.entity";
import { NotFoundException } from "@vigilio/express-core/handler";
import { HistorialStoreDto } from "../dtos/historial.store.dto";
import { HistorialUpdateDto } from "../dtos/historial.update.dto";

@Injectable()
export class HistorialService {
    async index() {
        const data = await Historial.findAll({ raw: true });
        return {
            success: true,
            data,
        };
    }

    async show(id: string) {
        const review = await Historial.findByPk(id);
        if (!review) {
            throw new NotFoundException(`No se encontró un review con ${id}`);
        }
        return {
            success: true,
            review,
        };
    }

    async store(historialStoreDto: HistorialStoreDto) {
        const review = new Historial(historialStoreDto);
        await review.save();

        return {
            success: true,
            review,
        };
    }

    async update(id: string, historialUpdateDto: HistorialUpdateDto) {
        const { review } = await this.show(id);

        await review.update(historialUpdateDto);
        return {
            success: true,
            review,
        };
    }

    async destroy(id: string) {
        const { review } = await this.show(id);

        await review.destroy();
        return {
            success: true,
            message: `El review con el id ${id} fue eliminado`,
        };
    }
}
