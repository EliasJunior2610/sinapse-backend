import { Body, Controller, Get, Post, Delete, Param } from "@nestjs/common";
import { ApiOperation, ApiBearerAuth, ApiBody, ApiParam } from "@nestjs/swagger";
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

    @Post()
    @ApiOperation({ summary: 'Criar uma nova disciplina' })
    @ApiBody({ type: SubjectDTO })
    async create(@Body() subject: SubjectDTO): Promise<SubjectResponseDTO> {
        return this.subjectService.create(subject);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma disciplina' })
    @ApiParam({ name: 'id', type: String, description: 'ID da disciplina' })
    async deleteById(@Param() params: any): Promise<string> {
        return this.subjectService.deleteById(params.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar disciplina por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID da disciplina' })
    async findById(@Param() params: any): Promise<SubjectResponseDTO> {
        return this.subjectService.findById(params.id);
    }
}