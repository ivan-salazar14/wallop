import axios from "axios";
import currencyController from "../domain/services/currency";

interface currencyList {
    symbol: string;
}
const getCurrencies = async () => {
    try {
        return await axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
        console.log('call api to update market')

    } catch (error) {
        console.log(error)
    }
}


const updateCurrenciesDatabase = async () => {
    const currencies = await getCurrencies()
    if (currencies) {
        try {
            currencies.data.forEach(async element => {
                const user = await currencyController.CreateCurrency({
                    symbol: element
                });
            });
        } catch (error) {
            console.log('error on update currencys', error)
        }
    }
}
export default updateCurrenciesDatabase;