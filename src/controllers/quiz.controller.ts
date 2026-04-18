import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QuizService } from 'src/services/quiz.service';
import { QuizDTO, QuizResponseDTO, QuestionDTO, UpdateQuizDTO } from 'src/DTOs/QuizDTO';

@ApiBearerAuth()
@Controller('/quizzes')
export class QuizController {
  constructor(private quizzesService: QuizService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo quiz' })
  @ApiBody({ type: QuizDTO })
  async create(@Body() quiz: QuizDTO): Promise<QuizResponseDTO> {
    return this.quizzesService.create(quiz);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os quizzes' })
  async findAll(): Promise<QuizResponseDTO[]> {
    return this.quizzesService.findAll();
  }

  @Get('/user-quizzes/:user_id')
  @ApiOperation({ summary: 'Listar todos os quizzes do usuário' })
  @ApiParam({ name: 'user_id', type: String, description: 'ID do usuário' })
  async findUserQuizzes(@Param('user_id') user_id: string): Promise<QuizResponseDTO[]> {
    return this.quizzesService.findUserQuizzes(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar quiz por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do quiz' })
  async findById(@Param() params: any): Promise<QuizResponseDTO> {
    return this.quizzesService.findById(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um quiz' })
  @ApiParam({ name: 'id', type: String, description: 'ID do quiz' })
  @ApiBody({ type: UpdateQuizDTO })
  async findByIdAndUpdate(
    @Param() params: any,
    @Body('requesterId') requesterId: string,
    @Body('quiz') quiz: Partial<QuizDTO>,
  ): Promise<QuizResponseDTO> {
    return this.quizzesService.findByIdAndUpdate(params.id, requesterId, quiz);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um quiz' })
  @ApiParam({ name: 'id', type: String })
  async deleteById(@Param() params: any): Promise<string> {
    return this.quizzesService.deleteById(params.id);
  }

  // ------------------ QUESTIONS ------------------

  @Post('/question/:quizId')
  @ApiOperation({ summary: 'Adicionar pergunta ao quiz' })
  @ApiParam({ name: 'quizId', type: String, description: 'ID do quiz' })
  @ApiBody({ type: QuestionDTO })
  async addQuestion(
    @Param() params: any,
    @Body() question: QuestionDTO,
  ): Promise<QuizResponseDTO> {
    return this.quizzesService.addQuestion(params.quizId, question);
  }

  @Get('/question/:quizId')
  @ApiOperation({ summary: 'Buscar pergunta pelo texto' })
  @ApiParam({ name: 'quizId', type: String, description: 'ID do quiz' })
  @ApiQuery({
    name: 'questionText',
    type: String,
    description: 'texto da pergunta',
  })
  async findQuestionByText(
    @Param('quizId') quizId: string,
    @Query('questionText') questionText: string,
  ): Promise<QuestionDTO> {
    return this.quizzesService.findQuestionByText(quizId, questionText);
  }

  @Patch('question/:quizId')
  @ApiOperation({ summary: 'Atualizar uma pergunta' })
  @ApiParam({ name: 'quizId', type: String, description: 'ID do quiz' })
  @ApiQuery({
    name: 'questionText',
    type: String,
    description: 'texto da pergunta',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        updatedQuestion: {
          type: 'object',
          example: {
            question: 'Nova pergunta',
            possible_answers: ['A', 'B', 'C'],
            answer: [1, 2],
            boolean_answer: null,
          },
        },
      },
    },
  })
  async updateQuestion(
    @Param('quizId') quizId: string,
    @Query('questionText') questionText: string,
    @Body('updatedQuestion') updatedQuestion: Partial<QuestionDTO>,
  ): Promise<QuizResponseDTO> {
    return this.quizzesService.updateQuestion(
      quizId,
      questionText,
      updatedQuestion,
    );
  }

  @Delete('question/:quizId')
  @ApiOperation({ summary: 'Remover uma pergunta do quiz' })
  @ApiParam({ name: 'quizId', type: String, description: 'ID do quiz' })
  @ApiQuery({
    name: 'questionText',
    type: String,
    description: 'texto da pergunta',
  })
  async removeQuestion(
    @Param('quizId') quizId: string,
    @Query('questionText') questionText: string,
  ): Promise<QuizResponseDTO> {
    return this.quizzesService.removeQuestion(quizId, questionText);
  }

  @Post('answer/:quizId')
  @ApiOperation({ summary: 'Responder uma pergunta' })
  @ApiParam({ name: 'quizId', type: String, description: 'ID do quiz' })
  @ApiQuery({
    name: 'questionText',
    type: String,
    description: 'texto da pergunta',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userAnswer: {
          oneOf: [
            { type: 'number', example: 1 },
            { type: 'boolean', example: true },
          ],
        },
      },
    },
  })
  async answerQuestion(
    @Param('quizId') quizId: string,
    @Query('questionText') questionText: string,
    @Body('userAnswer') userAnswer: number | boolean,
  ): Promise<boolean> {
    return this.quizzesService.answerQuestion(quizId, questionText, userAnswer);
  }
}
