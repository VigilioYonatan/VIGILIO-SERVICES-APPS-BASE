import { Injectable } from "@decorators/di";
import { AuthRegisterDto } from "../dtos/auth.register.dto";
import { Users } from "@/users/entities/users.entity";

@Injectable()
export class AuthApiService {
    async register(authRegisterDto: AuthRegisterDto) {
        const user = new Users({
            ...authRegisterDto,
            slug: authRegisterDto.name,
            role_id: 3, //client
        });

        await user.save();
        return {
            success: true,
            user: {
                name: user.name,
                email: user.email,
            },
        };
    }
}
