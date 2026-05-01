import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'src/config/mongodb';
import { UserDTO, UserResponseDTO, CreateUserDTO } from 'src/users/UserDTO';
import { userSchema } from 'src/users/user.schema';

@Injectable()
export class UserRepository {
  private User = mongoose.model('User', userSchema);

  async insertOne(user: CreateUserDTO): Promise<UserResponseDTO> {
    const userExists = await this.User.findOne({ name: user.name });
    if (userExists) {
      throw new BadRequestException(
        'Esse nome de usuário já está sendo utilizado',
      );
    }

    const emailExists = await this.User.findOne({ email: user.email });
    if (emailExists) {
      throw new BadRequestException('Esse e-mail já está sendo utilizado');
    }

    const newUser = {
      ...user,
      paying: false,
      type: 'Student',
      answered_questions: 0,
      points: 0,
      course_id: '',
    };

    const doc = new this.User(newUser);
    const response = await doc.save();

    return {
      _id: response._id,
      name: response.name!,
      email: response.email!,
      paying: response.paying!,
      type: response.type as 'Admin' | 'Teacher' | 'Student',
      answered_questions: response.answered_questions!,
      points: response.points!,
      course_id: response.course_id!,
    };
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.User.find({}).lean(); // lean retorna os dados do documento

    return users.map((user) => ({
      _id: user._id,
      name: user.name!,
      email: user.email!,
      paying: user.paying!,
      type: user.type as 'Admin' | 'Teacher' | 'Student',
      answered_questions: user.answered_questions!,
      points: user.points!,
      course_id: user.course_id!,
    }));
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const user = await this.User.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      _id: user._id,
      name: user.name!,
      email: user.email!,
      paying: user.paying!,
      type: user.type as 'Admin' | 'Teacher' | 'Student',
      answered_questions: user.answered_questions!,
      points: user.points!,
      course_id: user.course_id!,
    };
  }

  async deleteById(id: string): Promise<string> {
    const user = await this.User.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return 'Usuário removido com sucesso.';
  }

  async findByIdAndUpdate(
    id: string,
    updatedUser: Partial<UserDTO>,
  ): Promise<UserResponseDTO> {
    const user = await this.User.findByIdAndUpdate(
      id,
      { $set: updatedUser }, // sobrescrever sem causar comportamentos indesejados
      { new: true }, //retorna o documento atualizado
    ).lean(); // retorna os dados do documento

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return {
      _id: user._id,
      name: user.name!,
      email: user.email!,
      paying: user.paying!,
      type: user.type as 'Admin' | 'Teacher' | 'Student',
      answered_questions: user.answered_questions!,
      points: user.points!,
      course_id: user.course_id!,
    };
  }

  async findByEmail(email: string) {
    const user = await this.User.findOne({ email }).lean();

    return user;
  }

  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.User.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (user.type !== 'Admin') {
      return false;
    }

    return true;
  }

  async isTeacher(userId: string): Promise<boolean> {
    const user = await this.User.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (user.type !== 'Teacher') {
      return false;
    }

    return true;
  }

  async isStudent(userId: string): Promise<boolean> {
    const user = await this.User.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (user.type !== 'Student') {
      return false;
    }

    return true;
  }

  async makeTeacher(
    userId: string,
    courseId: string,
  ): Promise<UserResponseDTO> {
    const user = await this.User.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (user.type == 'Teacher') {
      throw new NotFoundException('Usuário já é um professor.');
    }

    const updatedTeacher = {
      ...user.toObject(),
      type: 'Teacher',
      course_id: courseId,
    };

    console.log({ updatedTeacher });

    const updatedUser = await this.User.findByIdAndUpdate(
      userId,
      { $set: updatedTeacher }, // sobrescrever sem causar comportamentos indesejados
      { new: true }, //retorna o documento atualizado
    ).lean(); // retorna os dados do documento

    if (!updatedUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return {
      _id: updatedUser._id,
      name: updatedUser.name!,
      email: updatedUser.email!,
      paying: updatedUser.paying!,
      type: updatedUser.type as 'Admin' | 'Teacher' | 'Student',
      answered_questions: updatedUser.answered_questions!,
      points: updatedUser.points!,
      course_id: updatedUser.course_id!,
    };
  }

  async findByName(name: string) {
    return await this.User.findOne({ name }).lean();
  }
}
