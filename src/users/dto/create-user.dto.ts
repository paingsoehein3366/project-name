import { IsEmail, IsInt, IsString, MinLength, Min } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsInt()
  @Min(1)
  city_id: number;
}
