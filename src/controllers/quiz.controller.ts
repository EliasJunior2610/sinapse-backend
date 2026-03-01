import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from "@nestjs/common";
import { QuizService } from "src/services/quiz.service";
import type { QuizDTO, QuizResponseDTO, QuestionDTO } from "src/DTOs/QuizDTO";

@Controller('/quizzes')
export class QuizController {
    constructor(private quizzesService: QuizService) { }

    @Post()
    async create(@Body() quiz: QuizDTO): Promise<QuizResponseDTO> {
        return this.quizzesService.create(quiz);
    }

    @Get()
    async findAll(): Promise<QuizResponseDTO[]> {
        return this.quizzesService.findAll();
    }

    @Get(':id')
    async findById(@Param() params: any): Promise<QuizResponseDTO> {
        return this.quizzesService.findById(params.id);
    }

    @Patch(':id')
    async findByIdAndUpdate(
        @Param() params: any,
        @Body() quiz: Partial<QuizDTO>,
    ): Promise<QuizResponseDTO> {
        return this.quizzesService.findByIdAndUpdate(params.id,  quiz);
    }

    @Delete(':id')
    async deleteById(@Param() params: any): Promise<string> {
        return this.quizzesService.deleteById(params.id);
    }

    @Post('/question/:quizId')
    async addQuestion(
        @Param() params: any,
        @Body() question: QuestionDTO,
    ): Promise<QuizResponseDTO> {
        return this.quizzesService.addQuestion(params.quizId, question);
    }

    @Get('/question/:quizId')
    async findQuestionByText(
        @Param('quizId') quizId: string,
        @Query('questionText') questionText: string,
    ): Promise<QuestionDTO> {
        return this.quizzesService.findQuestionByText(quizId, questionText);
    }

    @Patch('question/:quizId')
    async updateQuestion(
        @Param('quizId') quizId: string,
        @Query('questionText') questionText: string,
        @Body('updatedQuestion') updatedQuestion: Partial<QuestionDTO>,
    ): Promise<QuizResponseDTO> {
        return this.quizzesService.updateQuestion(quizId, questionText, updatedQuestion);
    }

    @Delete('question/:quizId')
    async removeQuestion(
        @Param('quizId') quizId: string,
        @Query('questionText') questionText: string,
    ): Promise<QuizResponseDTO> {
        return this.quizzesService.removeQuestion(quizId, questionText);
    }

    @Post('answer/:quizId')
    async answerQuestion(
        @Param('quizId') quizId: string,
        @Query('questionText') questionText: string,
        @Body('userAnswer') userAnswer: number | boolean,
    ): Promise<boolean> {
        return this.quizzesService.answerQuestion(
            quizId,
            questionText,
            userAnswer,
        );
    }
}