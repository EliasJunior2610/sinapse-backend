import { UserRepository } from "src/repositories/user.repository";
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserDTO, UserResponseDTO, CreateUserDTO, LoggedUserDTO } from "src/DTOs/UserDTO";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async create(user: CreateUserDTO): Promise<UserResponseDTO> {
        if (!user) throw new BadRequestException('Usuário não enviado.');

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const userToSave = {
            ...user,
            password: hashedPassword,
        }

        const response = await this.userRepository.insertOne(userToSave);
        return response;
    }

    async findAll(): Promise<UserResponseDTO[]> {
        const response = await this.userRepository.findAll();
        return response;
    }

    async findById(id: string): Promise<UserResponseDTO> {
        if (!id) throw new BadRequestException('id de usuário não enviado');

        const response = await this.userRepository.findById(id);
        return response;
    }

    async deleteById(id: string): Promise<string> {
        if (!id) throw new BadRequestException('id de usuário não enviado');

        const response = await this.userRepository.deleteById(id);
        return response;
    }

    async updateById(id: string, updatedUser: Partial<UserDTO>): Promise<UserResponseDTO> {
        if (!id) throw new BadRequestException('id de usuário não enviado.');

        if (!updatedUser) throw new BadRequestException('Usuário não enviado.');

        if (updatedUser.password) {
            const saltRounds = 10;

            const hashedPassword = await bcrypt.hash(updatedUser.password, saltRounds);

            updatedUser.password = hashedPassword;
        }

        const response = await this.userRepository.findByIdAndUpdate(id, updatedUser);
        return response;
    }

    async login(email: string, password: string): Promise<LoggedUserDTO> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
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