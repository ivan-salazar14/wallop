import User, { IUser } from '../models/user';
import { CreateQuery } from 'mongoose';
import { body, validationResult } from 'express-validator/check';
import Binance from 'node-binance-api'

const binance = new Binance().options({});
async function getMarket(): Promise<any> {
    let ticker = await binance.prices();
    console.info(`Price of BNB: ${ticker.BNBUSDT}`);

    return ticker;

}

const userValidationRules = () => {
    return [
        // username must be an email
        body('email').isEmail(),
        // password must be at least 5 chars long
        body('firstName').isLength({ min: 5 }),
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
    getMarket,
    validate,
    userValidationRules
};