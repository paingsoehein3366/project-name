import { IsString, Min, MinLength } from "class-validator";

export class CreatePhotoDto {
  @IsString()
  url: string;

  @MinLength(3)
  @IsString()
  description: string;

  @IsString()
  @Min(1)
  user_id: number;
}
