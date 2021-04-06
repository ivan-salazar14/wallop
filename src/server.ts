import app from './app';
import connect from './infra/databases/mongodb/connect'

const port = 3000
const db = 'mongodb://localhost:27017/wallop';

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

connect({ db });