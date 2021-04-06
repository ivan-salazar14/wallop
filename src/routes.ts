import { Router } from 'express';
import UserController from './domain/services/user';
import { body, check, validationResult } from 'express-validator';
const routes = Router();
routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});

routes.post('/user',
    UserController.userValidationRules(),
    UserController.validate,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const user = await UserController.CreateUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });

        return res.send({ user });
    });

routes.get('/market', function (req, res) {
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
