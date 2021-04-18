import axios from "axios";
import currencyService from "../domain/services/currency";
import marketService from "../domain/services/market";

interface currencyList {
    symbol: string;
}

const updateCurrenciesDatabase = async () => {
    const currencies = await marketService.getCurrencies()
    if (currencies) {
        try {
            currencies.data.forEach(async element => {
                await currencyService.CreateCurrency({
                    symbol: element
                });
            });
        } catch (error) {
            console.log('error on update currencys', error)
        }
    }
}
export default updateCurrenciesDatabase;