import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

export interface IuserCoins extends Document {
    symbol: string;
    username: IUser['_id'];
}

const UserCoinsSchema: Schema = new Schema({
    symbol: { type: String, required: true },
    username: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IuserCoins>('UserCoins', UserCoinsSchema);
