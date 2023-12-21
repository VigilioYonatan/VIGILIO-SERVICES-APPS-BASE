import { Categories } from "@/categories/entities/categories.entity";
import { categoriesSeeder } from "@/categories/seeders/categories.seeder";
import { Information } from "@/information/entities/information.entity";
import { Products } from "@/products/entities/products.entity";
import { productsSeeder } from "@/products/seeders/products.seeder";
import { Reviews } from "@/reviews/entities/reviews.entity";
import { reviewsSeeder } from "@/reviews/seeders/reviews.seeder";
import { Roles } from "@/roles/entities/roles.entity";
import { rolesSeeder } from "@/roles/seeders/roles.seeder";
import { Users } from "@/users/entities/users.entity";
import { usersSeeder } from "@/users/seeders/users.seeder";
import { Injectable } from "@decorators/di";
import { Controller, Get } from "@decorators/express";
import { slug } from "@vigilio/express-core";
import { sequelize } from "~/config/db.config";
import enviroments from "~/config/enviroments.config";
import { SeedersService } from "../services/seeders.service";

@Injectable()
@Controller("/seeders")
export class SeederController {
    constructor(private readonly seedersService: SeedersService) {}
    @Get("/")
    async index() {
        const result = await this.seedersService.index();
        return result;
    }
}
