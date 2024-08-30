import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateCommentDto {
  @MinLength(1)
  @IsString()
  text: string;

  @Min(1)
  @IsNumber()
  user_id: number;

  @Min(1)
  @IsNumber()
  photo_id: number;
}
