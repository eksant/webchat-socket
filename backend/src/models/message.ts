// backend/src/models/Message.ts
import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
  user: string;
  text: string;
  createdAt: Date;
  parentId?: string;
}

const messageSchema = new Schema<IMessage>({
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String, required: false },
});

export default model<IMessage>('Message', messageSchema);
