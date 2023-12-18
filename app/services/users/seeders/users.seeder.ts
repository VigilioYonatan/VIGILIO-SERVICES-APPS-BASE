import { customArray, slug } from "@vigilio/express-core";
import { UsersEntitySchema } from "../schemas/users.schema";
import { faker } from "@faker-js/faker";

export const usersSeeder: UsersEntitySchema[] = customArray(100).map((_, i) => {
    const name = faker.person.firstName() + i;

    return {
        name,
        email: faker.internet.email(),
        password: "123456",
        enabled: faker.datatype.boolean(),
        dni: faker.string.numeric(8),
        foto: [{ dimension: 300, file: faker.image.avatarGitHub() }],
        slug: slug(name),
        role_id: Math.floor(Math.random() * 4) + 1,
    };
});
