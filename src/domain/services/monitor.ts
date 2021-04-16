import Coin, { Icoin } from '../models/coin';
import { CreateQuery } from 'mongoose';
import { body, validationResult } from 'express-validator/check';
import User, { IUser } from "../models/user";
const saltRounds = 10;

const followCoin = function ({ username, coin }) {
    return User.findByIdAndUpdate(
        username,
        { $push: { following: coin._id } },
        { new: true, useFindAndModify: false }
    );
};

async function follow({ username, symbol }): Promise<IUser> {
    let finded = await Coin.findOne({ symbol: symbol }).exec();
    let created = await User.findOneAndUpdate(
        username,
        { $push: { following: finded._id } }
    );
    return created;
}

async function following({ username }): Promise<Icoin[]> {

    let findedUser = await User.findOne({ username }).exec();
    let findedCoins = await Coin.find({ _id: findedUser.following }).exec();

    console.log(findedUser);
    console.log(findedCoins);


    return

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
    validate,
    userValidationRules
};