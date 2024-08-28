import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  city_id: number;

  created_at: Date;

  updated_at: Date;
}
