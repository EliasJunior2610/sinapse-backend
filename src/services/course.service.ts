import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CourseResponseDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
} from 'src/DTOs/CourseDTO';
import { CourseRepository } from 'src/repositories/course.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class CourseService {
  constructor(
    private courseRepository: CourseRepository,
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
}
