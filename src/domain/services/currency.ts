import Currency, { Icurrency } from '../models/currency';
import { CreateQuery } from 'mongoose';
import { body, validationResult } from 'express-validator/check';


async function getCurrencies(): Promise<string> {

    let currencies = await Currency.find({}).select('symbol -_id');

    let filtered = "";
    await currencies.forEach(element => {

        filtered += element.symbol + ","
    });
    return filtered.slice(0, -1);
}

async function CreateCurrency({
    symbol
}: CreateQuery<Icurrency>): Promise<Icurrency> {


    const filter = { symbol: symbol };
    const update = {
        symbol,
        last_update: new Date(),
    };

    return Currency.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
    })
        .then((data: Icurrency) => {
            data.__v = undefined
            data._id = undefined
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}

const currencyValidationRules = () => {
    return [
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
    CreateCurrency,
    validate,
    getCurrencies,
    currencyValidationRules
};