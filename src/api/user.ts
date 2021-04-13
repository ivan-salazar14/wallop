

import { Router } from 'express';
import UserController from '../domain/services/user';
import { body, check, validationResult } from 'express-validator';

const userRouter = Router();

userRouter.post('/user',
    UserController.userValidationRules(),
    UserController.validate,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const user = await UserController.CreateUser({
            name: req.body.name,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            prefer_coin: req.body.prefer_coin,
        });

        return res.send({ user });
    });

export default userRouter;