import Coin, { Icoin } from '../models/coin';
import { CreateQuery } from 'mongoose';
import { body, validationResult } from 'express-validator/check';

async function getCoins(): Promise<string> {

    let coins = await Coin.find({}).select('id -_id');

    let filtered = "";
    await coins.forEach(element => {

        filtered += element.id + ","
    });
    return filtered.slice(0, -1);
}

async function CreateCoin({
    id,
    symbol,
    name
}: CreateQuery<Icoin>): Promise<Icoin> {

    const filter = { symbol: symbol };
    const update = {
        id,
        symbol,
        name,
        last_update: new Date(),
    };

    return Coin.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
    })
        .then((data: Icoin) => {
            data.__v = undefined
            data._id = undefined
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}

const coinValidationRules = () => {
    return [
        body('name').isString().isLength({ min: 3 }),
        body('symbol').isString().isLength({ min: 3 }),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

export default {
    CreateCoin,
    getCoins,
    validate,
    coinValidationRules
};