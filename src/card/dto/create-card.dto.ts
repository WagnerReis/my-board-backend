import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  code: number;

  @IsString()
  status: string;

  @IsNumber()
  estimated: number;

  @IsDate()
  dueDate: Date;

  @IsString()
  user_id: string;
}
