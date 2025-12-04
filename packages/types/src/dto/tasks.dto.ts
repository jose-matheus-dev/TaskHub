import { IsArray, IsDateString, IsEnum, IsString, IsUUID, Max, Min } from 'class-validator';
import { Priority, Status } from '../enums.js';


export class TaskDTO {
  @IsUUID()
  id: string;

  @Min(5)
  @Max(100)
  @IsString()
  title: string;

  @Max(300)
  @IsString()
  description: string;

  @IsDateString()
  deadline: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsEnum(Status)
  status: Status;

  @IsArray()
  @IsUUID('4', { each: true })
  users: string[];

  @IsDateString()
  created: string;

  @IsDateString()
  updated: string;
}
