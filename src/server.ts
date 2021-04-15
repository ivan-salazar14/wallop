import app from './app';
import connect from './infra/databases/mongodb/connect'
import updateCoinsDatabase from "./events/coinList";
import updateCurrenciesDatabase from "./events/currencyList";
import updatePricesCoinsDatabase from "./events/updatepriceCoins";


const port = 3000
const db = 'mongodb://localhost:27017/wallop';
connect({ db });

//updateCoinsDatabase();
//updateCurrenciesDatabase();
//updatePricesCoinsDatabase();

//setInterval(refreshMarket, 2000);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})