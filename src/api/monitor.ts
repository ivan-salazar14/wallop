
import { Router } from 'express';
import coinService from '../domain/services/market';
import monitorService from '../domain/services/monitor';
import { verify } from "../middleware/checkAuthorization";
import { validationResult } from 'express-validator';
const authRouter = Router();

//endpoint to get all coins availables.
authRouter.get('/coins',
    verify,
    async (req, res) => {
        try {
            const market = await coinService.getMarket(req['user'].prefer_coin, Number(req.query.page), Number(req.query.per_page));
            return res.send(market);
        } catch (error) {
            return res.status(422).json({ errors: error });
        }

    });

/*
Endpoint to get the top  coins by user with filters 

@params quantity : quantity of coins to be listed.
@params order: asc/desc listed.
*/
authRouter.get('/follow/:quantity',
    verify,
    async (req, res) => {
        try {
            let order = req.params.order ? req.params.order : -1;
            const market = await monitorService.following(req['user'].username, Number(order), Number(req.params.quantity));
            return res.send(market);

        } catch (error) {
            return res.status(422).json({ errors: error });
        }

    })

/*
Endpoint to follow a coins. 

@params symbol : symbol of coins to be followed.
*/
authRouter.post('/follow',
    verify,
    monitorService.userValidationRules(),
    monitorService.validate,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const market = await monitorService.follow({ username: req['user'].username, symbol: req.body.symbol });
            return res.status(200).json({ message: market });

        } catch (error) {
            return res.status(422).json({ errors: error });
        }

    })
export default authRouter;