/**
 * Required External Modules
 */
import express from 'express';
import { EventEmitter } from 'events';
import cors from "cors";
import helmet from "helmet";


/**
 * App Variables
 */
const app = express()
const port = 3000
const eventEmitter = new EventEmitter();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.set('eventEmitter', eventEmitter);
// access it from any module of the application
// console.log(app.get('eventEmitter'));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/market', function (req, res) {
    res.send('get all market')
})
app.route('/trade/:id')
    .get(function (req, res) {
        res.send('get one trade')
    });


app.route('/order')
    .get(function (req, res) {
        res.send('get all order maked')
    })
    .post(function (req, res, next) {
        res.send('create order')
        // next(new Error('not implemented'))
    })
app.route('/order/:id')
    .get(function (req, res) {
        res.send('get one order')
    });


app.route('/deposit')
    .get(function (req, res) {
        res.send('get all deposit maked')
    })
    .post(function (req, res, next) {
        res.send('create deposit')
        // next(new Error('not implemented'))
    })


app.route('/transfer')
    .get(function (req, res) {
        res.send('get all transfer maked')
    })
    .post(function (req, res, next) {
        res.send('create transfer')
        // next(new Error('not implemented'))
    })



app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

eventEmitter.on('start', (start, end) => {
    console.log(`started from ${start} to ${end}`)
})

eventEmitter.emit('start', 1, 100)