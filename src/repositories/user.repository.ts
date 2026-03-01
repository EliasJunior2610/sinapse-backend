import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import mongoose from "src/config/mongodb";
import { UserDTO, UserResponseDTO } from "src/DTOs/UserDTO";
import { userSchema } from "src/schemas/user.schema";

@Injectable()
export class UserRepository {
    private User = mongoose.model('User', userSchema);

    async insertOne(user: UserDTO): Promise<UserResponseDTO> {
        const userExists = await this.User.findOne({ name: user.name });
        if (userExists) {
            throw new BadRequestException('Esse nome de usuário já está sendo utilizado');
        }

        const emailExists = await this.User.findOne({ email: user.email });
        if (emailExists) {
            throw new BadRequestException('Esse e-mail já está sendo utilizado');
        }

        const doc = new this.User(user);
        const response = await doc.save();

        return {
            _id: response._id,
            name: response.name!,
            email: response.email!,
            paying: response.paying!,
            answered_questions: response.answered_questions!,
            points: response.points!,
        }
    }

    async findAll(): Promise<UserResponseDTO[]> {
        const users = await this.User.find({}).lean(); // lean retorna os dados do documento

        return users.map(user => ({
            _id: user._id,
            name: user.name!,
            email: user.email!,
            paying: user.paying!,
            answered_questions: user.answered_questions!,
            points: user.points!,
        }))
    }

    async findById(id: string): Promise<UserResponseDTO> {
        const user = await this.User.findById(id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return {
            _id: user._id,
            name: user.name!,
            email: user.email!,
            paying: user.paying!,
            answered_questions: user.answered_questions!,
            points: user.points!,
        }
    }

    async deleteById(id: string): Promise<string> {
        const user = await this.User.findByIdAndDelete(id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return 'Usuário removido com sucesso.';
    }

    async findByIdAndUpdate(id: string, updatedUser: Partial<UserDTO>): Promise<UserResponseDTO> {
        const user = await this.User.findByIdAndUpdate(
            id,
            { $set: updatedUser }, // sobrescrever sem causar comportamentos indesejados
            { new: true }, //retorna o documento atualizado
        ).lean(); // retorna os dados do documento

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return {
            _id: user._id,
            name: user.name!,
            email: user.email!,
            paying: user.paying!,
            answered_questions: user.answered_questions!,
            points: user.points!,
        };
    }

    async findByEmail(email: string) {
        const user = await this.User.findOne({ email }).lean();

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }
}