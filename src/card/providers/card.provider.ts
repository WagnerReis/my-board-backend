import { Connection } from 'mongoose';
import { CardSchema } from '../schemas/card.schema';

export const cardProviders = [
  {
    provide: 'CARD_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Card', CardSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
