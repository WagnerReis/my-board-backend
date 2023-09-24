import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsNumber()
  estimated: number;

  @IsDate()
  dueDate: Date;
}
