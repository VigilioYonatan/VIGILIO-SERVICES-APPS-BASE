import { Injectable } from "@decorators/di";
import { Reviews } from "../entities/reviews.entity";
import { NotFoundException } from "@vigilio/express-core/handler";
import { ReviewsStoreDto } from "../dtos/reviews.store.dto";
import { ReviewsUpdateDto } from "../dtos/reviews.update.dto";

@Injectable()
export class ReviewsService {
    async index() {
        const data = await Reviews.findAll({ raw: true });
        return {
            success: true,
            data,
        };
    }

    async show(id: string) {
        const review = await Reviews.findByPk(id);
        if (!review) {
            throw new NotFoundException(`No se encontró un review con ${id}`);
        }
        return {
            success: true,
            review,
        };
    }

    async store(reviewsStoreDto: ReviewsStoreDto) {
        const review = new Reviews(reviewsStoreDto);
        await review.save();

        return {
            success: true,
            review,
        };
    }

    async update(id: string, reviewsUpdateDto: ReviewsUpdateDto) {
        const { review } = await this.show(id);

        await review.update(reviewsUpdateDto);
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
