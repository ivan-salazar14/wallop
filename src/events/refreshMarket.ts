import axios from "axios";
const interval = () => {


    /*
    let preferCurrencies=getpreferCurrencies();
    preferCurrencies.foreach((currency)=>{

        let preferCoinsByCurrencies= getpreferCoinsByCurrency(currency);
    updateCoins(            callMarket(currency,preferCoinsByCurrencies));
    })

*/
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    console.log('call api to update market')
}

/* const interval = setInterval(() => {
}, 2000);
 */
export default interval;