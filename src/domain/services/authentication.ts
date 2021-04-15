import User, { IUser } from '../models/user';
import { Mongoose } from 'mongoose';
import { body, validationResult } from 'express-validator/check';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltRounds = 10;

export interface Authentication {
    auth: (authenticationParams: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
    export interface Params {
        username: string
        password: string
    }

    export interface Result {
        accessToken?: string
        expiresIn?: string
        error?: string
    }
}

async function Login({ username, password }): Promise<Authentication.Result> {

    let finded = await User.findOne({ username: username }).exec();

    console.log(finded);

    let result = <Authentication.Result>{}

    if (!finded) {
        result.error = "Username does not exist";
        return result;
    }
    if (finded.username != username) {
        result.error = "Username does not exist";
        return result;
    }

    let compared = await bcrypt.compare(password, finded.password);

    if (compared) {

        let payload = { username: username, prefer_coin: finded.prefer_coin }

        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        //create the refresh token with the longer lifespan
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_TOKEN_LIFE
        })
        result.accessToken = accessToken;
        result.expiresIn = process.env.ACCESS_TOKEN_LIFE;
        //store the refresh token in the user array
        // users[username].refreshToken = refreshToken
        return result

    } else {
        result.error = "wrong password or username";
        return result;
    }
}


const userValidationRules = () => {
    return [
        body('username').isString().isLength({ min: 5 }).toLowerCase(),
        body('password').isLength({ min: 8 }).isAlphanumeric(),//.isStrongPassword(),
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
    Login,
    validate,
    userValidationRules
};