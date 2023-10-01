import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import {
  UpdateCardDto,
  UpdateDueDateCardDto,
  UpdateEstimatedCardDto,
  UpdateStatusCardDto,
} from './dto/update-card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  findAll(
    @Query('title') title: string,
    @Query('user_id') user_id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: number,
  ) {
    return this.cardService.findAll({ user_id, title, page, limit, sort });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Patch('/updateStatus/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusCardDto: UpdateStatusCardDto,
  ) {
    return this.cardService.updateStatus(id, updateStatusCardDto);
  }

  @Patch('/updateEstimated/:id')
  updateEstimated(
    @Param('id') id: string,
    @Body() updateEstimatedCardDto: UpdateEstimatedCardDto,
  ) {
    return this.cardService.updateEstimated(id, updateEstimatedCardDto);
  }

  @Patch('/updateDueDate/:id')
  updateDueDate(
    @Param('id') id: string,
    @Body() updateDueDateCardDto: UpdateDueDateCardDto,
  ) {
    return this.cardService.updateDueDate(id, updateDueDateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }
}
