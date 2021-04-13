
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
    //   email: string;
    name: string;
    lastName: string;
    username: string;
    password: string;
    prefer_coin: string;
    //   gender?: Gender;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    prefer_coin: { type: String, required: true, unique: true },
    /*  gender: { type: String, enum: Object.values(Gender) },
    address: {
        street: { type: String },
        city: { type: String },
        postCode: { type: String }
    } */
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);