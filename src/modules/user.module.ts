import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { UsersService } from "src/services/user.service";
import { UserRepository } from "src/repositories/user.repository";

@Module({
    controllers: [UserController],
    providers: [UsersService, UserRepository],
})
export class UserModule { }