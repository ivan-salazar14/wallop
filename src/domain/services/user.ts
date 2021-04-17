import User, { IUser } from '../models/user';
import { CreateQuery } from 'mongoose';
import { body, validationResult } from 'express-validator/check';
import bcrypt from "bcrypt";
const saltRounds = 10;
async function CreateUser({
    name,
    lastName,
    username,
    password,
    prefer_coin
}: CreateQuery<IUser>): Promise<IUser> {

    let hash = await bcrypt.hash(password, saltRounds)//.then(hash => {
    return User.create({
        name,
        lastName,
        username,
        password: hash,
        prefer_coin
    })
        .then((data: IUser) => {
            data.password = undefined
            data.__v = undefined
            data._id = undefined
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
}

const userValidationRules = () => {
    return [
        body('name').isString().isLength({ min: 3 }),
        body('lastName').isString().isLength({ min: 3 }),
        body('username').isString().isLength({ min: 4 }).toLowerCase(),
        body('password').isLength({ min: 8 }).isAlphanumeric(),
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
    CreateUser,
    validate,
    userValidationRules
};