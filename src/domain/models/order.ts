import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

export interface Iorder extends Document {
    pair: string;
    priceBuy: string;
    owner: IUser['_id'];
}

const OrderSchema: Schema = new Schema({
    pair: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<Iorder>('Order', OrderSchema);
