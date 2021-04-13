import mongoose, { Schema, Document } from 'mongoose';

export interface market extends Document {
    symbol: string,
    name: string,
    price: string,
    volumen: number,
    last_update: Date
}