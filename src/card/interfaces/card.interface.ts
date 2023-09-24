import { Document } from 'mongoose';

export interface Card extends Document {
  readonly title: string;
  readonly description: string;
  readonly code: string;
  readonly status: string;
  readonly estimated: string;
  readonly dueDate: string;
}
