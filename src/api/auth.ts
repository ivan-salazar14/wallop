
import { Router } from 'express';
import { validationResult } from 'express-validator';
import authService from '../domain/services/authentication';
const authRouter = Router();

/*
Endpoint to login a user.

@params username : username of user.
@params password : password of user.
*/
authRouter.post('/login',
    authService.userValidationRules(),
    authService.validate,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const user = await authService.Login({
            username: req.body.username,
            password: req.body.password,
        });

        return res.send({ user });
    });

export default authRouter;