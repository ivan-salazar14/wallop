
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
        let accessToken = req.cookies.jwt;
        console.log(accessToken)
        /*    const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(422).json({ errors: errors.array() });
           } */
        const user = await coinController.getMarket(accessToken);

        return res.send({ user });
    });

export default authRouter;