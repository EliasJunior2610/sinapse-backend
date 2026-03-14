import { Controller, Get, Post, Delete, Put, Body, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { SemesterService } from "src/services/semester.service";
import { SemesterDTO, SemesterResponseDTO, UpdateSemesterBodyDTO, UpdateSemesterDTO } from "src/DTOs/SemesterDTO";
import { UserIdDTO } from "src/DTOs/UserDTO";

@ApiBearerAuth()
@Controller('semesters')
export class SemesterController {
    constructor(private semesterService: SemesterService) { }

    @Post()
    @ApiOperation({ summary: 'Verificar se é adm e cria novo período' })
    @ApiBody({ type: SemesterDTO })
    async create(@Body() newSemester: SemesterDTO): Promise<SemesterResponseDTO> {
        return this.semesterService.create(newSemester.userId, newSemester.name);
    }

    @Get()
    @ApiOperation({ summary: 'Retornar todos os semestres' })
    async findAll(): Promise<SemesterResponseDTO[]> {
        return this.semesterService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Listar semestre por ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do semestre' })
    async findById(@Param() params: any): Promise<SemesterResponseDTO> {
        return this.semesterService.findById(params.id);
    }

    @Delete(':semesterId')
    @ApiOperation({ summary: 'Remover um semestre' })
    @ApiParam({ name: 'semesterId', type: String, description: 'ID do semestre' })
    async deleteById(@Param() params: any, @Body() userId: UserIdDTO): Promise<string> {
        return this.semesterService.deleteById(userId.userId, params.semesterId);
    }

    @Put(':semesterId')
    @ApiOperation({ summary: 'Atualizar um semestre' })
    @ApiParam({ name: 'semesterId', type: String, description: 'ID do semestre' })
    @ApiBody({ type: UpdateSemesterBodyDTO })
    async updateById(
        @Param() params: any,
        @Body() updateSemester: UpdateSemesterBodyDTO
    ): Promise<SemesterResponseDTO> {
        const request: UpdateSemesterDTO = {
            userId: updateSemester.userId,
            semesterId: params.semesterId,
            name: updateSemester.name,
        };

        return this.semesterService.updateById(request);
    }
}