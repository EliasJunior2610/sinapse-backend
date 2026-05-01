import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'src/config/mongodb';
import { SemesterResponseDTO } from 'src/semesters/SemesterDTO';
import { semesterSchema } from 'src/semesters/semester.schema';

@Injectable()
export class SemesterRepository {
  private Semester = mongoose.model('Semester', semesterSchema);

  async insertOne(name: string): Promise<SemesterResponseDTO> {
    const doc = new this.Semester({ name: name }).save();

    return doc;
  }

  async findAll(): Promise<SemesterResponseDTO[]> {
    const semesters = await this.Semester.find({}).lean();

    return semesters;
  }

  async findById(semesterId: string): Promise<SemesterResponseDTO> {
    const semester = await this.Semester.findById(semesterId).lean();

    if (!semester) {
      throw new NotFoundException('Período não encontrado');
    }

    return semester;
  }

  async updateById(
    semesterId: string,
    name: string,
  ): Promise<SemesterResponseDTO> {
    const semester = await this.Semester.findByIdAndUpdate(
      semesterId,
      {
        $set: {
          name: name,
        },
      },
      { new: true },
    ).lean();

    if (!semester) {
      throw new NotFoundException('Período não encontrado');
    }

    return semester;
  }

  async deleteById(semesterId: string): Promise<string> {
    const semester = await this.Semester.findByIdAndDelete(semesterId);

    if (!semester) {
      throw new NotFoundException('Período não encontrado');
    }

    return 'Período removido com sucesso.';
  }
}
