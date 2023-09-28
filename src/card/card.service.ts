import { Inject, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto, UpdateStatusCardDto } from './dto/update-card.dto';
import { Model } from 'mongoose';
import { Card } from './interfaces/card.interface';

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

  findAll({ title, page, limit, sort }) {
    const cards = this.cardModel.find(
      { $or: [{ title: new RegExp(title) }, { code: title }] },
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

  remove(id: string) {
    return this.cardModel.deleteOne({ _id: id });
  }
}
