import Coin, { Icoin } from '../models/coin';
import { body, validationResult } from 'express-validator/check';
import User, { IUser } from "../models/user";
import marketController from "./coingekco";
const saltRounds = 10;

/* const followCoin = function ({ username, coin }) {
    return User.findByIdAndUpdate(
        username,
        { $push: { following: coin._id } },
        { new: true, useFindAndModify: false }
    );
}; */

async function follow({ username, symbol }): Promise<IUser> {
    let finded = await Coin.findOne({ symbol: symbol }).exec();
    let created = await User.findOneAndUpdate(
        username,
        { $push: { following: finded._id } }
    );
    return created;
}

async function following(username: string, order: Number): Promise<any[]> {

    try {
        let findedUser = await User.findOne({ username }).exec();
        let findedCoins = await Coin.find({ _id: findedUser.following }).select('id symbol name -_id').sort({ symbol: order });
        let filtered = "";
        findedCoins.forEach(element => {

            filtered += element.id + ","
        });
        filtered = filtered.slice(0, -1);
        let coinPrices = await marketController.coinPrices(filtered, findedUser.prefer_coin + "," + process.env.COINS_DEFAULT);

        console.log('coinprces', coinPrices);
        /*   console.log('findedCoins', findedCoins);
    */
        let result = []
        for (var currency in coinPrices) {

            console.log(currency + ": " + coinPrices[currency][findedUser.prefer_coin]);
            let actual = findedCoins.filter((ob) => {
                return ob.id == currency
            });
            console.log('finded', actual)
            result.push({
                symbol: actual[0].symbol,
                name: actual[0].name,
                price_prefer_coin: coinPrices[currency][findedUser.prefer_coin],
                price_usd: coinPrices[currency]['usd'],
                price_ars: coinPrices[currency]['ars'],
                price_eur: coinPrices[currency]['eur'],
                last_updated: coinPrices[currency]['last_updated_at']
            })
        }
        return result;
    } catch (error) {
        return error;
    }

}

const userValidationRules = () => {
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
    follow,
    following,
    validate,
    userValidationRules
};