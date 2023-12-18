import { Injectable } from "@decorators/di";
import { Products } from "../entities/products.entity";

@Injectable()
export class ProductsRepository {
    latestOffer() {
        return Products.scope("latestOffer").findAll();
    }
}
