import axios from "axios";
import coinController from "../domain/services/coin";

interface coinList {
    id: number;
    symbol: string;
    name: string;
}
const getCoins = async () => {
    try {
        return await axios.get("https://api.coingecko.com/api/v3/coins/list?include_platform=false")
        console.log('call api to update market')

    } catch (error) {
        console.log(error)
    }
}


const updateCoinsDatabase = async () => {
    const coins = await getCoins()
    if (coins) {
        try {
            coins.data.forEach(async element => {
                const user = await coinController.CreateCoin({
                    symbol: element.symbol,
                    name: element.name,
                    id: element.id
                });
            });
        } catch (error) {
            console.log('error on update coins', error)
        }
    }
}
export default updateCoinsDatabase;