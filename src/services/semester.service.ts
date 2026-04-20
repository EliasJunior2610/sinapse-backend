import { BadRequestException, Injectable } from '@nestjs/common';
import { SemesterRepository } from 'src/repositories/semester.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { SemesterResponseDTO, UpdateSemesterDTO } from 'src/DTOs/SemesterDTO';
import { CourseRepository } from 'src/repositories/course.repository';
import { SubjectRepository } from 'src/repositories/subject.repository';
import { CourseResponseDTO } from 'src/DTOs/CourseDTO';
import { SubjectResponseDTO } from 'src/DTOs/SubjectDTO';

@Injectable()
export class SemesterService {
  constructor(
    private semesterRepository: SemesterRepository,
    private userRepository: UserRepository,
    private courseRepository: CourseRepository,
    private subjectRepository: SubjectRepository,
  ) {}

  async create(userId: string, name: string): Promise<SemesterResponseDTO> {
    const isUserAdmin = await this.userRepository.isAdmin(userId);

    if (!isUserAdmin) {
      throw new BadRequestException(
        'Usuário não tem permissão para cadastrar período.',
      );
    }

    if (!name) {
      throw new BadRequestException('Período não enviado.');
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
      throw new BadRequestException('Id não enviado.');
    }

    const response = await this.semesterRepository.findById(semesterId);

    return response;
  }

  async deleteById(userId: string, semesterId: string): Promise<string> {
    const isUserAdmin = await this.userRepository.isAdmin(userId);

    if (!isUserAdmin) {
      throw new BadRequestException(
        'Usuário não tem permissão para remover período.',
      );
    }

    if (!semesterId) {
      throw new BadRequestException('Id não enviado.');
    }

    const courses: CourseResponseDTO[] = await this.courseRepository.findAll();

    for (const course of courses) {
      if (course.semesters_ids?.includes(semesterId)) {
        throw new BadRequestException(
          'Período está sendo utilizado em um ou mais cursos.',
        );
      }
    }

    const subjects: SubjectResponseDTO[] =
      await this.subjectRepository.findAll();

    for (const subject of subjects) {
      if (subject.semester_id == semesterId) {
        throw new BadRequestException(
          'Período está sendo utilizado em uma ou mais disciplinas.',
        );
      }
    }

    const response = await this.semesterRepository.deleteById(semesterId);

    return response;
  }

  async updateById(
    updatedSemester: UpdateSemesterDTO,
  ): Promise<SemesterResponseDTO> {
    if (
      !updatedSemester.name ||
      !updatedSemester.semesterId ||
      !updatedSemester.userId
    ) {
      throw new BadRequestException('Parâmetros faltantes.');
    }

    const isUserAdmin = await this.userRepository.isAdmin(
      updatedSemester.userId,
    );

    if (!isUserAdmin) {
      throw new BadRequestException(
        'Usuário não tem permissão para remover período.',
      );
    }

    const response = await this.semesterRepository.updateById(
      updatedSemester.semesterId,
      updatedSemester.name,
    );

    return response;
  }
}
