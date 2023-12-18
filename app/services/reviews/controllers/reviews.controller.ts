import { Injectable } from "@decorators/di";
import { ReviewsService } from "../services/reviews.service";
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
import { ReviewsStoreDto, reviewsStoreDto } from "../dtos/reviews.store.dto";
import { ReviewsUpdateDto, reviewsUpdateDto } from "../dtos/reviews.update.dto";
import { objectAsync, string } from "valibot";

@Injectable()
@Controller("/reviews")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get("/")
    async index() {
        const result = await this.reviewsService.index();
        return result;
    }

    @Pipe(
        objectAsync({
            slug: string(),
        })
    )
    @Get("/:slug")
    async show(@Params("slug") slug: string) {
        const result = await this.reviewsService.show(slug);
        return result;
    }

    @Validator(reviewsStoreDto)
    @Status(201)
    @Post("/")
    async store(@Body() reviewsStoreDto: ReviewsStoreDto) {
        const result = await this.reviewsService.store(reviewsStoreDto);
        return result;
    }

    @Pipe(
        objectAsync({
            id: string(),
        })
    )
    @Validator(reviewsUpdateDto)
    @Status(200)
    @Put("/:id")
    async update(
        @Params("id") id: string,
        @Body() reviewsUpdateDto: ReviewsUpdateDto
    ) {
        const result = await this.reviewsService.update(id, reviewsUpdateDto);
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
        const result = await this.reviewsService.destroy(id);
        return result;
    }
}
