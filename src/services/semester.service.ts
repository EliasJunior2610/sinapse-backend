import { BadRequestException, Injectable } from "@nestjs/common";
import { SemesterRepository } from "src/repositories/semester.repository";
import { UserRepository } from "src/repositories/user.repository";
import { SemesterResponseDTO, UpdateSemesterDTO } from "src/DTOs/SemesterDTO";

@Injectable()
export class SemesterService {
    constructor(
        private semesterRepository: SemesterRepository,
        private userRepository: UserRepository,
    ) { }

    async create(userId: string, name: string): Promise<SemesterResponseDTO> {
        const isUserAdmin = await this.userRepository.isAdmin(userId);

        if (!isUserAdmin) {
            throw new BadRequestException('Usuário não tem permissão para cadastrar semestre.');
        }

        if (!name) {
            throw new BadRequestException('Semestre não enviado.');
        }

        const response = await this.semesterRepository.insertOne(name);

        return response;
    }

    async findAll(): Promise<SemesterResponseDTO[]> {
        const response = await this.semesterRepository.findAll();

        return response;
    }

    async findById(semesterId: string): Promise<SemesterResponseDTO> {
        if (!semesterId) {
            throw new BadRequestException('Id não enviado.')
        }

        const response = await this.semesterRepository.findById(semesterId);

        return response;
    }

    async deleteById(userId: string, semesterId: string): Promise<string> {
        const isUserAdmin = await this.userRepository.isAdmin(userId);

        if (!isUserAdmin) {
            throw new BadRequestException('Usuário não tem permissão para remover semestre.');
        }

        if (!semesterId) {
            throw new BadRequestException('Id não enviado.')
        }

        const response = await this.semesterRepository.deleteById(semesterId);

        return response;
    }

    async updateById(updatedSemester: UpdateSemesterDTO): Promise<SemesterResponseDTO> {
        if(!updatedSemester.name || !updatedSemester.semesterId || !updatedSemester.userId) {
            throw new BadRequestException('Parâmetros faltantes.');
        }

        const isUserAdmin = await this.userRepository.isAdmin(updatedSemester.userId);

        if (!isUserAdmin) {
            throw new BadRequestException('Usuário não tem permissão para remover semestre.');
        }

        const response = await this.semesterRepository.updateById(
            updatedSemester.semesterId,
            updatedSemester.name,
        );

        return response;
    }
}