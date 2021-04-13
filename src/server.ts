import app from './app';
import connect from './infra/databases/mongodb/connect'
import Binance from 'node-binance-api'



const binance = new Binance().options({});

const port = 3000
const db = 'mongodb://localhost:27017/wallop';

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

connect({ db });

binance.websockets.miniTicker(markets => {
    console.info(markets);
});