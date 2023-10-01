import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import {
  UpdateCardDto,
  UpdateDueDateCardDto,
  UpdateEstimatedCardDto,
  UpdateStatusCardDto,
} from './dto/update-card.dto';
import { Model } from 'mongoose';
import { Card } from './interfaces/card.interface';

interface Filter {
  title?: RegExp;
  code?: string;
  $text?: { $search: string };
  user_id?: string;
}

@Injectable()
export class CardService {
  constructor(
    @Inject('CARD_MODEL')
    private cardModel: Model<Card>,
  ) {}
  async create(createCardDto: CreateCardDto) {
    let codeNumber: number = await this.cardModel.countDocuments();
    codeNumber++;

    const newCard = {
      ...createCardDto,
      code: codeNumber,
      dueDate: new Date(createCardDto.dueDate),
    };

    const createdCard = new this.cardModel(newCard);
    return createdCard.save();
  }

  findAll({ user_id, title, page, limit, sort }) {
    if (!user_id)
      throw new HttpException('user_id not found.', HttpStatus.NOT_FOUND);
    const filterTrim = title ? title.trim() : '';
    let filter: Filter;
    if (!isNaN(title) && typeof +title === 'number') {
      filter = { code: title };
    } else {
      filter =
        filterTrim === ''
          ? { user_id }
          : { $text: { $search: String(title) }, user_id };
    }

    const cards = this.cardModel.find(
      filter,
      {},
      { skip: page * limit, limit, sort },
    );

    return cards;
  }

  findOne(id: string) {
    const card = this.cardModel.findOne({
      _id: id,
    });

    return card;
  }

  update(id: string, updateCardDto: UpdateCardDto) {
    return this.cardModel.updateOne({ _id: id }, { $set: updateCardDto });
  }

  updateStatus(id: string, updateStatusCardDto: UpdateStatusCardDto) {
    return this.cardModel.updateOne({ _id: id }, { $set: updateStatusCardDto });
  }

  updateEstimated(id: string, updateEstimatedCardDto: UpdateEstimatedCardDto) {
    return this.cardModel.updateOne(
      { _id: id },
      { $set: updateEstimatedCardDto },
    );
  }

  updateDueDate(id: string, updateDueDateCardDto: UpdateDueDateCardDto) {
    return this.cardModel.updateOne(
      { _id: id },
      { $set: updateDueDateCardDto },
    );
  }

  remove(id: string) {
    return this.cardModel.deleteOne({ _id: id });
  }
}
