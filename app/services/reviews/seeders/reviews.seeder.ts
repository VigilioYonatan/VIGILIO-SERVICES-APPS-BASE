import { customArray } from "@vigilio/express-core";
import { faker } from "@faker-js/faker";
import { ReviewsEntitySchema } from "../schemas/reviews.schema";

export const reviewsSeeder: ReviewsEntitySchema[] = customArray(100).map(
    (_, i) => {
        return {
            name: faker.person.firstName(),
            star: Number(faker.finance.amount({ min: 0, max: 5 })),
            review: faker.lorem.sentence(),
            user_id: i + 1,
        };
    }
);
