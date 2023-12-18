import { UsersSocketController } from "@/users/controllers/users.socket.controller";
import { Type } from "@decorators/di/lib/src/types";

export const socketsRouters: Type[] = [UsersSocketController];
