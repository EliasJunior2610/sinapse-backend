import { SubjectRepository } from "src/repositories/subject.repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { SubjectDTO, SubjectResponseDTO } from "src/DTOs/SubjectDTO";

@Injectable()
export class SubjectService {
    constructor(private subjectRepository: SubjectRepository) { }

    async findAll(): Promise<SubjectResponseDTO[]> {
        return this.subjectRepository.findAll();
    }

    async create(subject: SubjectDTO): Promise<SubjectResponseDTO> {
        if (!subject) {
            throw new BadRequestException('Disciplina não enviada.');
        }

        return await this.subjectRepository.create(subject);
    }

    async deleteById(id: string): Promise<string> {
        if (!id) {
            throw new BadRequestException('Id não enviado.');
        }

        return this.subjectRepository.deleteById(id);
    }

    async findById(id: string): Promise<SubjectResponseDTO> {
        if (!id) {
            throw new BadRequestException('Id não enviado.');
        }

        return this.subjectRepository.findById(id);
    }
}