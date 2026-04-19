import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CourseResponseDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
} from 'src/DTOs/CourseDTO';
import { SubjectResponseDTO } from 'src/DTOs/SubjectDTO';
import { CourseRepository } from 'src/repositories/course.repository';
import { SubjectRepository } from 'src/repositories/subject.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class CourseService {
  constructor(
    private courseRepository: CourseRepository,
    private subjectRepository: SubjectRepository,
    private userRepository: UserRepository,
  ) {}

  async insertOne(createCourse: CreateCourseDTO): Promise<CourseResponseDTO> {
    const isUserAdmin: boolean = await this.userRepository.isAdmin(
      createCourse.user_id,
    );

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'Usuário não tem permissão para cadastrar curso.',
      );
    }

    if (!createCourse.name) {
      throw new BadRequestException('Curso não enviado.');
    }

    return await this.courseRepository.insertOne(createCourse.name);
  }

  async findAll(): Promise<CourseResponseDTO[]> {
    return await this.courseRepository.findAll();
  }

  async findById(course_id: string): Promise<CourseResponseDTO> {
    if (!course_id) {
      throw new BadRequestException('Curso não enviado');
    }

    return await this.courseRepository.findById(course_id);
  }

  async updateById(
    user_id: string,
    course_id: string,
    updated_course: Partial<UpdateCourseDTO>,
  ): Promise<CourseResponseDTO> {
    if (!course_id) {
      throw new BadRequestException('ID do curso não enviado.');
    }

    const isUserAdmin: boolean = await this.userRepository.isAdmin(user_id);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'Usuário não possui permissão para alterar curso',
      );
    }

    if (!updated_course) {
      throw new BadRequestException('Curso não enviado.');
    }

    return await this.courseRepository.updateById(course_id, updated_course);
  }

  async deleteById(user_id: string, course_id: string): Promise<string> {
    if (!user_id || !course_id) {
      throw new BadRequestException('Parâmetros não enviados.');
    }

    const isUserAdmin: boolean = await this.userRepository.isAdmin(user_id);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'Usuário não possui permissão para remover curso',
      );
    }

    return this.courseRepository.deleteById(course_id);
  }

  async findSubjects(course_id: string): Promise<SubjectResponseDTO[]> {
    const course = await this.courseRepository.findById(course_id);

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    if (!course.semesters_ids) {
      throw new NotFoundException('O curso pesquisado não possui períodos.');
    }

    const subjects = await this.subjectRepository.findAll();

    // procurando pelas disciplinas que fazem parte do curso
    const courseSubjects: SubjectResponseDTO[] = subjects.filter((subject) =>
      course.semesters_ids?.includes(subject.semester_id),
    );

    return courseSubjects;
  }
}
