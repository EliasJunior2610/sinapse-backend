import { Controller, Post, Get, Patch, Body, Param } from "@nestjs/common";
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
    async findByIdAndUpdate(@Param() params: any, @Body() quiz: Partial<QuizDTO>): Promise<QuizResponseDTO> {
        return this.quizzesService.findByIdAndUpdate(params.id,  quiz);
    }

    // INCOMPLETO - múltiplas escolhas não funcionam ainda
    @Post('/question/:quizId')
    async addQuestion(@Param() params: any, @Body() question: QuestionDTO): Promise<QuizResponseDTO> {
        return this.quizzesService.addQuestion(params.quizId, question);
    }
}