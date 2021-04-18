import mongoose, { Schema, Document } from 'mongoose';
import user from "./user";
export interface Icoin extends Document {
    id: string,
    symbol: string,
    name: string,
    price?: Number,
    image?: string,
    last_update?: Date
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: [true, 'Enter a id.'], unique: [true, 'That id is taken.'] },
    symbol: { type: String, required: [true, 'Enter a symbol.'], index: { unique: true } },
    name: { type: String, required: [true, 'Enter a name.'] },
    image: { type: String },
    price: { type: Number, required: [true, 'Enter a price.'] },
    last_update: { type: Date },
    users: [{ type: Schema.Types.ObjectId, ref: user }]

});
export default mongoose.model<Icoin>('Coin', UserSchema);