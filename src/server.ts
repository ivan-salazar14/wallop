import app from './app';
import connect from './infra/databases/mongodb/connect'
//import refreshMarket from "./event/refreshMarket";


const port = 3000
const db = 'mongodb://localhost:27017/wallop';
connect({ db });
//setInterval(refreshMarket, 2000);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})