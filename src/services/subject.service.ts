import { SubjectRepository } from 'src/repositories/subject.repository';
import { UserRepository } from 'src/repositories/user.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubjectDTO, SubjectResponseDTO } from 'src/DTOs/SubjectDTO';

@Injectable()
export class SubjectService {
  constructor(
    private subjectRepository: SubjectRepository,
    private userRepository: UserRepository,
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
