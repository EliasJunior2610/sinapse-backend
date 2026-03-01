import { UserRepository } from "src/repositories/user.repository";
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserDTO, UserResponseDTO, CreateUserDTO, LoggedUserDTO } from "src/DTOs/UserDTO";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async create(user: CreateUserDTO): Promise<UserResponseDTO> {
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

    async login(email: string, password: string): Promise<LoggedUserDTO> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Senha inválida');
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                is_admin: user.is_admin
            },
            process.env.SECRET as string,
            { expiresIn: '1d' }
        );

        return {
            token: token,
            _id: user._id,
            name: user.name,
            email: user.email,
            paying: user.paying,
            is_admin: user.is_admin,
            answered_questions: user.answered_questions,
            points: user.points,
        }
    }
}