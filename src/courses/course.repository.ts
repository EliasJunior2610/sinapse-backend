import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import mongoose from 'src/config/mongodb';
import { CourseResponseDTO, UpdateCourseDTO } from 'src/courses/CourseDTO';
import { courseSchema } from 'src/courses/course.schema';

@Injectable()
export class CourseRepository {
  private Course = mongoose.model('Course', courseSchema);

  async insertOne(name: string): Promise<CourseResponseDTO> {
    const courseExists = await this.Course.findOne({ name: name });

    if (courseExists) {
      throw new BadRequestException('Curso já existente.');
    }

    const doc = new this.Course({ name: name, semesters_ids: [] }).save();

    return doc;
  }

  async findAll(): Promise<CourseResponseDTO[]> {
    return await this.Course.find({}).lean();
  }

  async findById(course_id: string): Promise<CourseResponseDTO> {
    const course = await this.Course.findById(new Types.ObjectId(course_id));

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return course;
  }

  async updateById(
    id: string,
    updated_course: Partial<UpdateCourseDTO>,
  ): Promise<CourseResponseDTO> {
    const course = await this.Course.findByIdAndUpdate(
      id,
      { $set: updated_course },
      { new: true },
    ).lean();

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return course;
  }

  async deleteById(course_id: string): Promise<string> {
    const course = await this.Course.findByIdAndDelete(course_id);

    if (!course) {
      throw new NotFoundException('Curso não encontrado.');
    }

    return 'Curso removido com sucesso.';
  }
}
