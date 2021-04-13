import { Router } from 'express';
import UserController from './domain/services/user';
import binanceController from './domain/services/binance';
import { body, check, validationResult } from 'express-validator';
import userApi from './api/user'


const routes = Router();


routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});

routes.use('/v1', userApi);

routes.get('/market', async (req, res) => {
    const ticker = await binanceController.getMarket();
    return res.send({ ticker });
    res.send('get all market')
})
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
