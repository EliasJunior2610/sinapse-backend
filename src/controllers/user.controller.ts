import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from 'src/services/user.service';
import {
  LoginDTO,
  UserDTO,
  UserResponseDTO,
  CreateUserDTO,
  LoggedUserDTO,
  UserEmailDTO,
} from 'src/DTOs/UserDTO';

@ApiBearerAuth()
@Controller('/users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiBody({ type: CreateUserDTO })
  async create(@Body() user: CreateUserDTO): Promise<UserResponseDTO> {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  async findAll(): Promise<UserResponseDTO[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca usuário por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  async findById(@Param() params: any): Promise<UserResponseDTO> {
    return this.usersService.findById(params.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  async deleteById(@Param() params: any): Promise<string> {
    return this.usersService.deleteById(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UserDTO })
  async updateById(
    @Param() params: any,
    @Body() updatedUser: Partial<UserDTO>,
  ): Promise<UserResponseDTO> {
    return this.usersService.updateById(params.id, updatedUser);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Faz o login do usuário e retorna as informações do usuário',
  })
  @ApiBody({ type: LoginDTO })
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<LoggedUserDTO> {
    return this.usersService.login(body.email, body.password);
  }

  @Post('/forgotPassword')
  @ApiOperation({
    summary: 'Cria uma senha nova e a envia para o e-mail do usuário',
  })
  @ApiBody({ type: UserEmailDTO })
  async forgotPassword(@Body() body: UserEmailDTO): Promise<string> {
    return this.usersService.forgotPassword(body.email);
  }
}
