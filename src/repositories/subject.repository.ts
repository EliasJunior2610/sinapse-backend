import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'src/config/mongodb';
import { SubjectDTO, SubjectResponseDTO } from 'src/DTOs/SubjectDTO';
import { subjectSchema } from 'src/schemas/subject.schema';

@Injectable()
export class SubjectRepository {
  private Subject = mongoose.model('Subject', subjectSchema);

  async findAll(): Promise<SubjectResponseDTO[]> {
    const subjects = await this.Subject.find({}).lean();

    return subjects.map((subject) => ({
      _id: subject._id.toString(),
      name: subject.name,
      description: subject.description,
      user_id: subject.user_id,
      quizzes_ids: subject.quizzes_ids,
      students_ids: subject.students_ids,
      semester_id: subject.semester_id,
      invitation_code: subject.invitation_code ?? '',
      ranking: subject.ranking.map((rank: any) => ({
        user_id: rank.user_id,
        answered_questions: rank.answered_questions,
        correct_answers: rank.correct_answers,
      })),
    }));
  }

  async create(subject: SubjectDTO): Promise<SubjectResponseDTO> {
    const subjectExists = await this.Subject.findOne({ name: subject.name });

    if (subjectExists) {
      throw new BadRequestException('A disciplina já existe.');
    }

    const doc = new this.Subject(subject);
    const response = await doc.save();

    return {
      _id: response._id.toString(),
      name: response.name,
      description: response.description,
      user_id: response.user_id,
      quizzes_ids: response.quizzes_ids,
      students_ids: response.students_ids,
      semester_id: response.semester_id,
      invitation_code: response.invitation_code ?? '',
      ranking: response.ranking.map((r: any) => ({
        user_id: r.user_id,
        answered_questions: r.answered_questions,
        correct_answers: r.correct_answers,
      })),
    };
  }

  async deleteById(id: string): Promise<string> {
    const subject = await this.Subject.findByIdAndDelete(id);

    if (!subject) {
      throw new BadRequestException('Disciplina não encontrada.');
    }

    return 'Disciplina removida com sucesso.';
  }

  async findById(id: string): Promise<SubjectResponseDTO> {
    const subject = await this.Subject.findById(id);

    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    return {
      _id: subject._id.toString(),
      name: subject.name,
      description: subject.description,
      user_id: subject.user_id,
      quizzes_ids: subject.quizzes_ids,
      students_ids: subject.students_ids,
      semester_id: subject.semester_id,
      invitation_code: subject.invitation_code ?? '',
      ranking: subject.ranking.map((r: any) => ({
        user_id: r.user_id,
        answered_questions: r.answered_questions,
        correct_answers: r.correct_answers,
      })),
    };
  }

  async subscribeUser(
    subject_id: string,
    user_id: string,
    invitation_code: string,
  ): Promise<SubjectResponseDTO> {
    const invitationExists = await this.Subject.findOne({ invitation_code });

    if (!invitationExists) {
      throw new NotFoundException('Código de convite inválido');
    }

    const subject = await this.Subject.findByIdAndUpdate(
      subject_id,
      {
        $addToSet: {
          students_ids: user_id,
        },
      },
      { new: true },
    );

    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    return {
      _id: subject._id.toString(),
      name: subject.name,
      description: subject.description,
      user_id: subject.user_id,
      quizzes_ids: subject.quizzes_ids,
      students_ids: subject.students_ids,
      semester_id: subject.semester_id,
      invitation_code: subject.invitation_code ?? '',
      ranking: subject.ranking.map((r: any) => ({
        user_id: r.user_id,
        answered_questions: r.answered_questions,
        correct_answers: r.correct_answers,
      })),
    };
  }

  async addQuiz(
    subject_id: string,
    quiz_id: string,
  ): Promise<SubjectResponseDTO> {
    const subject = await this.Subject.findByIdAndUpdate(
      subject_id,
      {
        $addToSet: {
          quizzes_ids: quiz_id,
        },
      },
      { new: true },
    );

    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    return {
      _id: subject._id.toString(),
      name: subject.name,
      description: subject.description,
      user_id: subject.user_id,
      quizzes_ids: subject.quizzes_ids,
      students_ids: subject.students_ids,
      semester_id: subject.semester_id,
      invitation_code: subject.invitation_code ?? '',
      ranking: subject.ranking.map((r: any) => ({
        user_id: r.user_id,
        answered_questions: r.answered_questions,
        correct_answers: r.correct_answers,
      })),
    };
  }

  async updateById(
    subject_id: string,
    updatedSubject: Partial<SubjectDTO>,
  ): Promise<SubjectResponseDTO> {
    const subject = await this.Subject.findByIdAndUpdate(
      subject_id,
      { $set: updatedSubject },
      { new: true },
    ).lean();

    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    return {
      _id: subject._id.toString(),
      name: subject.name,
      description: subject.description,
      user_id: subject.user_id,
      quizzes_ids: subject.quizzes_ids,
      students_ids: subject.students_ids,
      semester_id: subject.semester_id,
      invitation_code: subject.invitation_code ?? '',
      ranking: subject.ranking.map((r: any) => ({
        user_id: r.user_id,
        answered_questions: r.answered_questions,
        correct_answers: r.correct_answers,
      })),
    };
  }
}
