
import { Router } from 'express';
import coinController from '../domain/services/coingekco';
import monitorController from '../domain/services/monitor';
import { verify } from "../middleware/checkAuthorization";
import { validationResult } from 'express-validator';
const authRouter = Router();

authRouter.get('/coins',
    verify,
    async (req, res) => {
        try {
            const market = await coinController.getMarket(req['user'].prefer_coin, Number(req.query.page), Number(req.query.per_page));
            return res.send(market);
        } catch (error) {
            return res.status(422).json({ errors: error });
        }

    });

authRouter.post('/follow',
    verify,
    monitorController.userValidationRules(),
    monitorController.validate,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            console.log("user :")
            console.log(req.user)
            console.log(req.body.symbol)



            const market = await monitorController.follow({ username: req['user'].username, symbol: req.body.symbol });
            return res.send(market);

        } catch (error) {
            return res.status(422).json({ errors: error });
        }

    })
export default authRouter;