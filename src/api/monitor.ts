
import { Router } from 'express';
import { validationResult } from 'express-validator';
import coinController from '../domain/services/coingekco';
import { verify } from "../middleware/checkAuthorization";
const authRouter = Router();

authRouter.get('/coins',
    verify,
    /*   coinController.userValidationRules(),
      coinController.validate, */
    async (req, res) => {
        let accessToken = req.headers['authorization']

        console.log('accessToken', req.body)
        /*    const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(422).json({ errors: errors.array() });
           } */
        try {

            const user = await coinController.getMarket(accessToken);
            return res.send({ user });
        } catch (error) {
            return res.status(422).json({ errors: error });
        }

    });

export default authRouter;