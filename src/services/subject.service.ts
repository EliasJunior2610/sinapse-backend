import { SubjectRepository } from "src/repositories/subject.repository";
import { Injectable } from "@nestjs/common";
import { SubjectDTO, SubjectResponseDTO } from "src/DTOs/SubjectDTO";

@Injectable()
export class SubjectService {
    constructor(private subjectRepository: SubjectRepository) { }

    async findAll(): Promise<SubjectResponseDTO[]> {
        return this.subjectRepository.findAll();
    }
}