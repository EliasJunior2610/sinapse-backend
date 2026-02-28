import { Controller, Get, Post, Delete, Patch, Body, Param } from "@nestjs/common";
import { UsersService } from "src/services/user.service";
import type { UserDTO, UserResponseDTO } from "src/DTOs/UserDTO";

@Controller('/users')
export class UserController {
    constructor(private usersService: UsersService) { }

    @Post()
    async create(@Body() user: UserDTO): Promise<UserResponseDTO> {
        return this.usersService.create(user);
    }

    @Get()
    async findAll(): Promise<UserResponseDTO[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param() params: any): Promise<UserResponseDTO> {
        return this.usersService.findById(params.id);
    }

    @Delete(':id')
    async deleteById(@Param() params: any): Promise<string> {
        return this.usersService.deleteById(params.id);
    }

    @Patch(':id')
    async updateById(@Param() params: any, @Body() updatedUser: Partial<UserDTO>): Promise<UserResponseDTO> {
        return this.usersService.updateById(params.id, updatedUser);
    }
}