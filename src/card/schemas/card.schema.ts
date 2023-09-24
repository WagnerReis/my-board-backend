import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    estimated: {
      type: Number,
      default: null,
    },
    dueDate: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
