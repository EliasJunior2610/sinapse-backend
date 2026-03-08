import { Module } from "@nestjs/common";
import { SubjectController } from "src/controllers/subject.controller";
import { SubjectService } from "src/services/subject.service";
import { SubjectRepository } from "src/repositories/subject.repository";

@Module({
    controllers: [SubjectController],
    providers: [SubjectService, SubjectRepository]
})
export class SubjectModule { }