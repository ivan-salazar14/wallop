
import mongoose, { Schema, Document } from 'mongoose';

/* export enum Gender {
    male = 'male',
    female = 'female',
    undisclosed = 'undisclosed'
} */
/* export interface Address extends Document {
    street: string;
    city: string;
    postCode: string;
}
 */
export interface IUser extends Document {
    name: string;
    lastName: string;
    username: string;
    password: string;
    prefer_coin: string;
    //   gender?: Gender;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: [true, 'Enter a name.'] },
    lastName: { type: String, required: [true, 'Enter a lastname.'] },
    username: { type: String, required: [true, 'Enter a username.'], unique: [true, 'That username is taken.'] },
    password: { type: String, required: [true, 'Enter a password.'], unique: true },
    prefer_coin: { type: String, required: [true, 'Enter a prefered coin.'] },
    /*  gender: { type: String, enum: Object.values(Gender) },
    address: {
        street: { type: String },
        city: { type: String },
        postCode: { type: String }
    } */
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);