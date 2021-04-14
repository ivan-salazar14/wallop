
import { Router } from 'express';
import { validationResult } from 'express-validator';
import authController from '../domain/services/authentication';
const authRouter = Router();

authRouter.post('/login',
    authController.userValidationRules(),
    authController.validate,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const user = await authController.Login({
            username: req.body.username,
            password: req.body.password,
        });

        return res.send({ user });
    });

export default authRouter;