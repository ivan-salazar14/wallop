import mongoose, { Schema, Document } from 'mongoose';

export interface Icoin extends Document {
    id: string,
    symbol: string,
    name: string,
    price?: Number,
    last_update?: Date
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: [true, 'Enter a symbol.'], unique: [true, 'That symbol is taken.'] },
    symbol: { type: String, required: [true, 'Enter a symbol.'], unique: [true, 'That symbol is taken.'] },
    name: { type: String, required: [true, 'Enter a name.'] },
    price: { type: Number, required: [true, 'Enter a price.'] },
    last_update: { type: Date },

});

// Export the model and return your IUser interface
export default mongoose.model<Icoin>('Coin', UserSchema);