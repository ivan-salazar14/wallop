import { Router } from 'express';
import UserController from './domain/services/user';
import coinGeckoController from './domain/services/coingekco';
import { body, check, validationResult } from 'express-validator';
import userApi from './api/user'
import auth from './api/auth'
import monitor from './api/monitor'


const routes = Router();


routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});

routes.use('/v1', userApi);
routes.use('/v1', auth);
routes.use('/v1', monitor);

/* routes.get('/market', async (req, res) => {
    let accessToken = req.cookies.jwt;
    console.log(accessToken)
    const ticker = await coinGeckoController.getMarket(accessToken);
    return res.send({ ticker });
    res.send('get all market')
}) */
routes.route('/trade/:id')
    .get(function (req, res) {
        res.send('get one trade')
    });


routes.route('/order')
    .get(function (req, res) {
        res.send('get all order maked')
    })
    .post(function (req, res, next) {
        res.send('create order')
        // next(new Error('not implemented'))
    })
routes.route('/order/:id')
    .get(function (req, res) {
        res.send('get one order')
    });


routes.route('/deposit')
    .get(function (req, res) {
        res.send('get all deposit maked')
    })
    .post(function (req, res, next) {
        res.send('create deposit')
        // next(new Error('not implemented'))
    })


routes.route('/transfer')
    .get(function (req, res) {
        res.send('get all transfer maked')
    })
    .post(function (req, res, next) {
        res.send('create transfer')
        // next(new Error('not implemented'))
    })

export default routes;
