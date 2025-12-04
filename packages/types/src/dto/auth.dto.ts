import { Expose } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
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

export class LoginDTO {
  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @Expose()
  password: string;
}

export class RefreshDTO {
  @IsString()
  @Expose()
  refreshToken: string;
}
