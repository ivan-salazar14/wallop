

import { Router } from 'express';
import UserService from '../domain/services/user';
import { validationResult } from 'express-validator';
const userRouter = Router();

/*
Endpoint to create a user. 

@params name : name of user.
@params lastname : lastname of user.
@params password : password of user.
@params prefer_coin : currency preferred by the user.
*/
userRouter.post('/user',
    UserService.userValidationRules(),
    UserService.validate,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {

            const user = await UserService.CreateUser({
                name: req.body.name,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                prefer_coin: req.body.prefer_coin,
            });

            return res.send({ user });
        } catch (error) {

            return res.status(422).json({ message: "error en los campos", fields: error.keyValue });
        }
    });

export default userRouter;