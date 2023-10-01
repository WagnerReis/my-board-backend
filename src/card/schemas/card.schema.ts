import mongoose from 'mongoose';

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
    code: {
      type: Number,
    },
    estimated: {
      type: Number,
      default: null,
    },
    dueDate: {
      type: String,
      default: null,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      require: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

CardSchema.index({ title: 'text' });
