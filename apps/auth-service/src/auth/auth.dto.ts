import { Expose } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Expose()
  username: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @Expose()
  password: string;
}

export class LoginDto {
  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @Expose()
  password: string;
}

export class RefreshDto {
  @IsString()
  @Expose()
  refreshToken: string;
}
