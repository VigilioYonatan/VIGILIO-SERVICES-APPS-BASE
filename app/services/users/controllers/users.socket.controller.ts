import { Injectable } from "@decorators/di";
import { Controller, Connection, IO } from "@decorators/socket";
import { Users } from "../entities/users.entity";
import socket from "socket.io";
@Injectable()
@Controller("/users")
export class UsersSocketController {
    @Connection()
    async index(@IO() io: socket.Socket) {
        const users = await Users.findAll({ limit: 10 });
        io.emit("users", users);
    }
}
