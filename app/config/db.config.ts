import { Sequelize } from "sequelize-typescript";
import { logger } from "@vigilio/express-core/helpers";
import { Users } from "@/users/entities/users.entity";
import { Products } from "@/products/entities/products.entity";
import { Categories } from "@/categories/entities/categories.entity";
import { Roles } from "@/roles/entities/roles.entity";
import { Information } from "@/information/entities/information.entity";
import { Reviews } from "@/reviews/entities/reviews.entity";

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "dokixd123",
    database: "restaurant",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

sequelize.addModels([
    Users,
    Products,
    Categories,
    Roles,
    Information,
    Reviews,
    // here entities
]);

export async function connectDB() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        logger.success("conectado a base de datos correctamente");
    } catch (error) {
        logger.error(`Error al conectar base de datos: ${error}`);
    }
}
export { sequelize };
