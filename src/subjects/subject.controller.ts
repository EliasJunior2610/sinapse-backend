import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { SubjectService } from 'src/subjects/subject.service';
import {
  AddQuizDTO,
  SubjectDTO,
  SubjectResponseDTO,
  SubscribeUserDTO,
  UnsubscribeUserDTO,
  RankingDTO,
  ScoreDTO,
  CreateSubjectDTO,
} from 'src/subjects/SubjectDTO';

@ApiBearerAuth()
@Controller('/subjects')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get('/ranking/:id')
  @ApiOperation({ summary: 'Retornar o ranque da disciplina' })
  @ApiParam({
    name: 'id',
    required: true,
    schema: { type: 'string' },
    description: 'ID da disciplina',
  })
  async ranking(@Param('id') id: string): Promise<ScoreDTO[]> {
    console.log({ id });
    return this.subjectService.ranking(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as disciplinas' })
  async findAll(): Promise<SubjectResponseDTO[]> {
    return this.subjectService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova disciplina' })
  @ApiBody({ type: CreateSubjectDTO })
  async create(@Body() subject: CreateSubjectDTO): Promise<SubjectResponseDTO> {
    return this.subjectService.create(subject);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma disciplina' })
  @ApiParam({ name: 'id', type: String, description: 'ID da disciplina' })
  async deleteById(@Param() params: any): Promise<string> {
    return this.subjectService.deleteById(params.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar disciplina por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID da disciplina' })
  async findById(@Param() params: any): Promise<SubjectResponseDTO> {
    return this.subjectService.findById(params.id);
  }

  @Post('/subscribe-user/:subject_id')
  @ApiOperation({ summary: 'Cadastrar usuário na disciplina' })
  @ApiParam({
    name: 'subject_id',
    type: String,
    description: 'ID da disciplina',
  })
  @ApiBody({ type: SubscribeUserDTO })
  async subscribeUser(
    @Param('subject_id') subject_id: string,
    @Body() body: SubscribeUserDTO,
  ): Promise<SubjectResponseDTO> {
    return this.subjectService.subscribeUser(
      subject_id,
      body.user_id,
      body.invitation_code,
    );
  }

  @Delete('/unsubscribe-user/:subject_id')
  @ApiOperation({ summary: 'Retirar usuário da disciplina' })
  @ApiParam({
    name: 'subject_id',
    type: String,
    description: 'ID da disciplina',
  })
  @ApiBody({ type: UnsubscribeUserDTO })
  async unsubscribeUser(
    @Param('subject_id') subject_id: string,
    @Body() body: UnsubscribeUserDTO,
  ): Promise<SubjectResponseDTO> {
    return this.subjectService.unsubscribeUser(subject_id, body.user_id);
  }

  @Post('/add-quiz/:subject_id')
  @ApiOperation({ summary: 'Adicionar um quiz à disciplina' })
  @ApiParam({
    name: 'subject_id',
    type: String,
    description: 'ID da disciplina',
  })
  @ApiBody({ type: AddQuizDTO })
  async addQuiz(
    @Param('subject_id') subject_id: string,
    @Body() body: AddQuizDTO,
  ): Promise<SubjectResponseDTO> {
    return this.subjectService.addQuiz(subject_id, body.quiz_id);
  }

  @Patch(':subject_id')
  @ApiOperation({ summary: 'Atualizar a disciplina' })
  @ApiParam({
    name: 'subject_id',
    type: String,
    description: 'ID da disciplina',
  })
  @ApiBody({ type: SubjectDTO })
  async updateById(
    @Param('subject_id') subject_id: string,
    @Body() body: Partial<SubjectDTO>,
  ): Promise<SubjectResponseDTO> {
    return this.subjectService.updateById(subject_id, body);
  }
}
