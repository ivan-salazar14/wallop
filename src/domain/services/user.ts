import User, { IUser } from '../models/user';
import { CreateQuery } from 'mongoose';
import { body, validationResult } from 'express-validator/check';

async function CreateUser({
    email,
    firstName,
    lastName,
    gender,
    address
}: CreateQuery<IUser>): Promise<IUser> {

    return User.create({
        email,
        gender,
        firstName,
        lastName,
        address
    })
        .then((data: IUser) => {
            return data;
        })
        .catch((error: Error) => {
            throw error;
        });
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
    CreateUser,
    validate,
    userValidationRules
};