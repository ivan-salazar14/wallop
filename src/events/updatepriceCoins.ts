import axios from "axios";
import currencyController from "../domain/services/currency";
import coinController from "../domain/services/coin";

interface coinList {
    id: number;
    symbol: string;
    name: string;
}
const updatePrices = async (id: string, vs_currencies: string) => {
    try {


        const prices = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
                id: id,
                vs_currencies: vs_currencies
            }
        })
        console.log(prices);
        console.log('call api to update prices')

    } catch (error) {
        console.log(error)
    }
}


const updatePricesCoinsDatabase = async () => {

    try {

        const currencies = await currencyController.getCurrencies();
        const coins = await coinController.getCoins();
        // console.log(coins);
        await updatePrices(coins, currencies);

            /* coins.data.forEach(async (element: { symbol: any; name: any; }) => {
                const user = await coinController.CreateCoin({
                    symbol: element.symbol,
                    name: element.name
                });
            }) */;
    } catch (error) {
        console.log('error on update coins', error)
    }
}
export default updatePricesCoinsDatabase;