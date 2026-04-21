import { SubjectRepository } from 'src/repositories/subject.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { QuizRepository } from 'src/repositories/quiz.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SubjectDTO,
  SubjectResponseDTO,
  RankingDTO,
} from 'src/DTOs/SubjectDTO';

@Injectable()
export class SubjectService {
  constructor(
    private subjectRepository: SubjectRepository,
    private userRepository: UserRepository,
    private quizRepository: QuizRepository,
  ) {}

  async findAll(): Promise<SubjectResponseDTO[]> {
    return this.subjectRepository.findAll();
  }

  async create(subject: SubjectDTO): Promise<SubjectResponseDTO> {
    if (!subject) {
      throw new BadRequestException('Disciplina não enviada.');
    }

    if (subject.invitation_code) {
      throw new BadRequestException(
        'Não tente criar o código de convite, ele é gerado automaticamente.',
      );
    }

    const isUserAdmin = await this.userRepository.isAdmin(subject.user_id);

    if (!isUserAdmin) {
      throw new BadRequestException(
        'Usuário não tem permissão para criar disciplina.',
      );
    }

    subject.invitation_code = this.generateRandomString();

    return this.subjectRepository.create(subject);
  }

  async deleteById(id: string): Promise<string> {
    if (!id) {
      throw new BadRequestException('Id não enviado.');
    }

    return this.subjectRepository.deleteById(id);
  }

  async findById(id: string): Promise<SubjectResponseDTO> {
    if (!id) {
      throw new BadRequestException('Id não enviado.');
    }

    return this.subjectRepository.findById(id);
  }

  async subscribeUser(
    subject_id: string,
    user_id: string,
    invitation_code: string,
  ): Promise<SubjectResponseDTO> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.subjectRepository.subscribeUser(
      subject_id,
      user_id,
      invitation_code,
    );
  }

  async unsubscribeUser(
    subject_id: string,
    user_id: string,
  ): Promise<SubjectResponseDTO> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.subjectRepository.unsubscribeUser(subject_id, user_id);
  }

  async addQuiz(
    subject_id: string,
    quiz_id: string,
  ): Promise<SubjectResponseDTO> {
    const quizExists = await this.quizRepository.findById(quiz_id);

    if (!quizExists) {
      throw new NotFoundException('Quiz não encontrado');
    }

    return this.subjectRepository.addQuiz(subject_id, quiz_id);
  }

  async updateById(
    subject_id: string,
    updatedSubject: Partial<SubjectDTO>,
  ): Promise<SubjectResponseDTO> {
    if (updatedSubject.invitation_code) {
      throw new BadRequestException(
        'Não é permitido modificar o código de convite',
      );
    }

    return this.subjectRepository.updateById(subject_id, updatedSubject);
  }

  async ranking(subject_id: string): Promise<RankingDTO[]> {
    const subject: SubjectResponseDTO =
      await this.subjectRepository.findById(subject_id);

    const ranking: RankingDTO[] = subject.ranking;

    const sortedRanking: RankingDTO[] = ranking.sort((a, b) => {
      const mediaA =
        a.answered_questions > 0 ? a.correct_answers / a.answered_questions : 0;

      const mediaB =
        a.answered_questions > 0 ? a.correct_answers / a.answered_questions : 0;

      return mediaB - mediaA;
    });

    return sortedRanking;
  }

  // função auxiliar
  generateRandomString(length = 8): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }
}
