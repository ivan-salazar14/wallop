import mongoose, { Schema, Document } from 'mongoose';

export interface Icurrency extends Document {
    symbol: string,
    last_update?: Date
}

const UserSchema: Schema = new Schema({
    symbol: { type: String, required: [true, 'Enter a symbol.'], unique: [true, 'That symbol is taken.'] },
    last_update: { type: Date },

});

export default mongoose.model<Icurrency>('Currency', UserSchema);