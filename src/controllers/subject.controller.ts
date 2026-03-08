import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { SubjectService } from "src/services/subject.service";
import { SubjectDTO, SubjectResponseDTO } from "src/DTOs/SubjectDTO";

@ApiBearerAuth()
@Controller('/subjects')
export class SubjectController {
    constructor(private subjectService: SubjectService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas as disciplinas' })
    async findAll(): Promise<SubjectResponseDTO[]> {
        return this.subjectService.findAll();
    }
}