import app from './app';
import connect from './infra/databases/mongodb/connect'
import updateCoinsDatabase from "./events/coinList";
import updateCurrenciesDatabase from "./events/currencyList";

const port = process.env.PORT
const db = process.env.DB_DRIVER + '://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

connect({ db });
setInterval(updateCoinsDatabase, Number(process.env.TIME_UPDATE_COINS));
setInterval(updateCurrenciesDatabase, Number(process.env.TIME_UPDATE_COINS));

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})