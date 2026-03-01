import { UserRepository } from "src/repositories/user.repository";
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserDTO, UserResponseDTO } from "src/DTOs/UserDTO";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async create(user: UserDTO): Promise<UserResponseDTO> {
        try {
            if (!user) throw new BadRequestException('Usuário não enviado.');

            const saltRounds = 10;

            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            const userToSave = {
                ...user,
                password: hashedPassword,
            }

            const response = await this.userRepository.insertOne(userToSave);
            return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Erro ao cadastrar usuário.');
        }
    }

    async findAll(): Promise<UserResponseDTO[]> {
        try {
            const response = await this.userRepository.findAll();
            return response;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Erro ao retornar usuários');
        }
    }

    async findById(id: string): Promise<UserResponseDTO> {
        try {
            if (!id) throw new BadRequestException('id de usuário não enviado');

            const response = await this.userRepository.findById(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new NotFoundException('Erro ao retornar usuário');
        }
    }
    
    async deleteById(id: string): Promise<string> {
        try {
            if (!id) throw new BadRequestException('id de usuário não enviado');

            const response = await this.userRepository.deleteById(id);
            return response;
        } catch (error) {
            console.error(error);
            throw new NotFoundException('Erro ao remover usuário');
        }
    }

    async updateById(id: string, updatedUser: Partial<UserDTO>): Promise<UserResponseDTO> {
        try {
            if (!id) throw new BadRequestException('id de usuário não enviado.');

            if (!updatedUser) throw new BadRequestException('Usuário não enviado.');

            const response = await this.userRepository.findByIdAndUpdate(id, updatedUser);
            return response;
        } catch (error) {
            console.error(error);
            throw new NotFoundException('Erro ao atualizar usuário');
        }
    }
}