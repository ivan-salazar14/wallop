
import mongoose, { Schema, Document } from 'mongoose';
import coin from "./coin";
/* export enum Gender {
    male = 'male',
    female = 'female',
    undisclosed = 'undisclosed'
} */

export interface following extends Document {
    symbol: string;
}

export interface IUser extends Document {
    name: string;
    lastName: string;
    username: string;
    password: string;
    prefer_coin: string;
    following?: [];

}

const UserSchema: Schema = new Schema({
    name: { type: String, required: [true, 'Enter a name.'] },
    lastName: { type: String, required: [true, 'Enter a lastname.'] },
    username: { type: String, required: [true, 'Enter a username.'], unique: [true, 'That username is taken.'] },
    password: { type: String, required: [true, 'Enter a password.'], index: { unique: true } },
    prefer_coin: { type: String, required: [true, 'Enter a prefered coin.'] },
    following: [{ type: Schema.Types.ObjectId, ref: coin, unique: true }]
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);