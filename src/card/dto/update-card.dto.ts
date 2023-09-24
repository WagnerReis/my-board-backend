import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCardDto extends PartialType(CreateCardDto) {}

export class UpdateStatusCardDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
