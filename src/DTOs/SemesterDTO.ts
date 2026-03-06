import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export class SemesterDTO {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    name: string;
}

export class SemesterResponseDTO {
    @ApiProperty()
    _id: Types.ObjectId;

    @ApiProperty()
    name: string;
}

export class UpdateSemesterDTO {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    semesterId: string;

    @ApiProperty()
    name: string;
}

export class UpdateSemesterBodyDTO {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    name: string;
}