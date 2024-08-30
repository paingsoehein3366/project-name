import { IsEmail, IsInt, IsString, MinLength, Min, MaxLength, Max } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(50)
  @IsString()
  username: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @MinLength(6)
  @MaxLength(50)
  @IsString()
  password: string;

  @IsInt()
  @Min(1)
  @Max(50)
  city_id: number;
}
