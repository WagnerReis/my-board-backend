import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { cardProviders } from './providers/card.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CardController],
  providers: [CardService, ...cardProviders],
  exports: [CardService],
})
export class CardModule {}
