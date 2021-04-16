

import { Router } from 'express';
import UserController from '../domain/services/user';
import { validationResult } from 'express-validator';
import { verify } from "../middleware/checkAuthorization";
const userRouter = Router();

userRouter.post('/user',
    UserController.userValidationRules(),
    UserController.validate,
    //   verify,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {

            const user = await UserController.CreateUser({
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