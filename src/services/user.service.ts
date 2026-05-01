const nodemailer = require('nodemailer');

import { UserRepository } from 'src/repositories/user.repository';
import { SubjectRepository } from 'src/repositories/subject.repository';
import { CourseRepository } from 'src/repositories/course.repository';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  UserDTO,
  UserResponseDTO,
  CreateUserDTO,
  LoggedUserDTO,
  ForgotPasswordDTO,
  RankingDTO,
} from 'src/DTOs/UserDTO';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SubjectResponseDTO } from 'src/DTOs/SubjectDTO';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private subjectRepository: SubjectRepository,
    private courseRepository: CourseRepository,
  ) {}

  async create(user: CreateUserDTO): Promise<UserResponseDTO> {
    if (!user) throw new BadRequestException('Usuário não enviado.');

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const userToSave = {
      ...user,
      password: hashedPassword,
    };

    const response = await this.userRepository.insertOne(userToSave);
    return response;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const response = await this.userRepository.findAll();
    return response;
  }

  async findById(id: string): Promise<UserResponseDTO> {
    if (!id) throw new BadRequestException('id de usuário não enviado');

    const response = await this.userRepository.findById(id);
    return response;
  }

  async deleteById(id: string): Promise<string> {
    if (!id) throw new BadRequestException('id de usuário não enviado');

    const subjects: SubjectResponseDTO[] =
      await this.subjectRepository.findAll();

    for (const subject of subjects) {
      if (subject.user_id == id) {
        throw new BadRequestException(
          'O usuário possui disciplinas em aberto.',
        );
      }

      if (subject.students_ids.includes(id)) {
        throw new BadRequestException(
          'O usuário está inscrito em uma disciplina.',
        );
      }
    }

    const response = await this.userRepository.deleteById(id);
    return response;
  }

  async updateById(
    id: string,
    updatedUser: Partial<UserDTO>,
  ): Promise<UserResponseDTO> {
    if (!id) throw new BadRequestException('id de usuário não enviado.');

    if (!updatedUser) throw new BadRequestException('Usuário não enviado.');

    if (updatedUser.password) {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(
        updatedUser.password,
        saltRounds,
      );

      updatedUser.password = hashedPassword;
    }

    const response = await this.userRepository.findByIdAndUpdate(
      id,
      updatedUser,
    );
    return response;
  }

  async login(email: string, password: string): Promise<LoggedUserDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        type: user.type,
      },
      process.env.SECRET as string,
      { expiresIn: '1d' },
    );

    return {
      token: token,
      _id: user._id,
      name: user.name,
      email: user.email,
      paying: user.paying,
      type: user.type as 'Admin' | 'Teacher' | 'Student',
      answered_questions: user.answered_questions,
      points: user.points,
      course_id: user.course_id as string,
    };
  }

  async forgotPassword(body: ForgotPasswordDTO): Promise<string> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const user = await this.userRepository.findByEmail(body.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newPassword = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.findByIdAndUpdate(user._id as unknown as string, {
      password: hashedPassword,
    });

    await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Recuperação de Senha',
      html: `Sua nova senha para o Sinapse é: <b>${newPassword}</b>`,
    });

    return 'Nova senha enviada para o seu e-mail.';
  }

  async ranking(): Promise<RankingDTO[]> {
    const users: UserResponseDTO[] = await this.userRepository.findAll();

    if (!users) {
      throw new NotFoundException('Usuários não encontrados.');
    }

    const usersPoints: RankingDTO[] = users.map((user) => ({
      _id: user._id as unknown as string,
      name: user.name,
      points: user.points,
    }));

    // Ordenando todos os usuários com base na pontuação
    const ranking: RankingDTO[] = usersPoints.sort(
      (a, b) => b.points - a.points,
    );

    return ranking;
  }

  async makeTeacher(
    userId: string,
    courseId: string,
  ): Promise<UserResponseDTO> {
    await this.courseRepository.findById(courseId);

    return await this.userRepository.makeTeacher(userId, courseId);
  }
}

// funções utilitárias
function generateRandomPassword(length = 10) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join('');
}
