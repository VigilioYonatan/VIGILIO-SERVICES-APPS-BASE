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
import { sequelize } from "~/config/db.config";
import enviroments from "~/config/enviroments.config";

@Injectable()
export class SeedersService {
    async index() {
        if (enviroments.NODE_ENV === "production") return;
        await sequelize.sync({ force: true });
        try {
            await Promise.all([
                Information.create({
                    name: "vigilio services",
                    email: "vigilioservicesperu@gmail.com",
                    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7807.885987821726!2d-77.0411029458046!3d-11.909055754418004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d02ea6ee1a19%3A0x7e8dee0c6daa4f0d!2sBanco%20de%20la%20Naci%C3%B3n!5e0!3m2!1ses-419!2spe!4v1700721342406!5m2!1ses-419!2spe",
                    telephoneFirst: "968650700",
                    about: "this is a a about page",
                    rol: "chef",
                }),
                Roles.bulkCreate(rolesSeeder),
                Categories.bulkCreate(categoriesSeeder),
            ]);
            await Promise.all([
                Users.bulkCreate([
                    ...usersSeeder,
                    {
                        name: "Yonatan",
                        email: "admin@admin.com",
                        password: "123456",
                        enabled: true,
                        dni: "70602064",
                        foto: [
                            {
                                dimension: 300,
                                file: `${enviroments.VITE_URL}/images/settings/vigilio-express.png`,
                            },
                        ],
                        slug: "yonatan",
                        role_id: 1,
                    },
                ]),
                Products.bulkCreate(productsSeeder),
            ]);
            await Promise.all([Reviews.bulkCreate(reviewsSeeder)]);
            return { success: true, message: "Seed executed" };
        } catch (error) {
            return {
                success: false,
                message: JSON.stringify((error as unknown as Error).message),
            };
        }
    }
}
