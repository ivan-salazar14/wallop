import User, { IUser } from '../models/user';
import { CreateQuery } from 'mongoose';
import { body, validationResult } from 'express-validator/check';
import axios from "axios";

async function getMarket(token: string): Promise<any> {
    let currency =
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then(res => {

                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                console.log('Status Code:', res.status);
                console.log('Date in Response header:', headerDate);
                //    console.log(res.data);

                return res.data.body;
            })

}
/* 
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
} */

export default {
    getMarket,
    /*  validate,
     userValidationRules */
};