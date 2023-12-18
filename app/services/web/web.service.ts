import { Injectable } from "@decorators/di";
import { ProductsRepository } from "../products/repositories/products.repository";
import { InformationRepository } from "@/information/repositories/information.repository";
import { CategoriesService } from "../categories/services/categories.service";
import { ReviewsRepository } from "../reviews/repositories/reviews.repository";
import { UsersRepository } from "../users/repositories/users.repository";

@Injectable()
export class WebService {
    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly informationRepository: InformationRepository,
        private readonly categoriesService: CategoriesService,
        private readonly reviewsRepository: ReviewsRepository,
        private readonly usersRepository: UsersRepository
    ) {}
    async home() {
        const [latestOffer, categories, reviews, members] = await Promise.all([
            this.productsRepository.latestOffer(),
            this.categoriesService.index(),
            this.reviewsRepository.customLimit(),
            this.usersRepository.showOnlyMembers(),
        ]);
        return { latestOffer, categories: categories.data, members, reviews };
    }
    async menu() {
        const [latestOffer, categories] = await Promise.all([
            this.productsRepository.latestOffer(),
            this.categoriesService.index(),
        ]);

        return { latestOffer, categories: categories.data };
    }
    async about() {
        const [reviews, members] = await Promise.all([
            this.reviewsRepository.customLimit(),
            this.usersRepository.showOnlyMembers(),
        ]);
        return { members, reviews };
    }
    async cart() {}

    async politica() {
        const [onlypolitica] = await Promise.all([
            this.informationRepository.onlypolitica(),
        ]);

        return { onlypolitica };
    }
}
