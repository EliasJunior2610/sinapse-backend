import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CourseService } from 'src/services/course.service';
import {
  CourseResponseDTO,
  CreateCourseDTO,
  DeleteCourseDTO,
  UpdateCourseControllerBodyDTO,
  UpdateCourseDTO,
} from 'src/DTOs/CourseDTO';
import { SubjectResponseDTO } from 'src/DTOs/SubjectDTO';

@ApiBearerAuth()
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo curso' })
  @ApiBody({ type: CreateCourseDTO })
  async insertOne(
    @Body() createCourse: CreateCourseDTO,
  ): Promise<CourseResponseDTO> {
    return this.courseService.insertOne(createCourse);
  }

  @Get()
  @ApiOperation({ summary: 'Retornar todos os cursos' })
  async findAll(): Promise<CourseResponseDTO[]> {
    return this.courseService.findAll();
  }

  @Get('course_subjects/:course_id')
  @ApiOperation({ summary: 'Retorna todas as disciplinas do curso' })
  @ApiParam({ name: 'course_id', type: String, description: 'ID do curso' })
  async findSubjects(
    @Param('course_id') course_id: string,
  ): Promise<SubjectResponseDTO[]> {
    return this.courseService.findSubjects(course_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar curso por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do curso' })
  async findById(@Param('id') course_id: string): Promise<CourseResponseDTO> {
    return this.courseService.findById(course_id);
  }

  @Patch(':course_id')
  @ApiOperation({ summary: 'Atualizar curso' })
  @ApiParam({ name: 'course_id', type: String, description: 'ID do curso' })
  @ApiBody({ type: UpdateCourseControllerBodyDTO })
  async updateById(
    @Param('course_id') course_id: string,
    @Body() body: UpdateCourseControllerBodyDTO,
  ): Promise<CourseResponseDTO> {
    return this.courseService.updateById(
      body.user_id,
      course_id,
      body.updated_course,
    );
  }

  @Delete(':course_id')
  @ApiOperation({ summary: 'Remover curso' })
  @ApiParam({ name: 'course_id', type: String, description: 'ID do curso' })
  @ApiBody({ type: DeleteCourseDTO })
  async DeleteById(
    @Param('course_id') course_id: string,
    @Body() body: DeleteCourseDTO,
  ): Promise<string> {
    return this.courseService.deleteById(body.user_id, course_id);
  }
}
