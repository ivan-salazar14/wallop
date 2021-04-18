import marketService from "../domain/services/market";
import coinService from "../domain/services/coin";

interface coinList {
    id: number;
    symbol: string;
    name: string;
}

const updateCoinsDatabase = async () => {
    try {
        const coins = await marketService.getCoins()
        if (coins) {
            coins.data.forEach(async element => {
                const result = await coinService.CreateCoin({
                    symbol: element.symbol,
                    name: element.name,
                    id: element.id
                });
                if (!result) {
                    let resp = "error on save coin";
                    return resp;
                }
            });

        }
    } catch (error) {
        console.log('error on update coins', error)
    }
}
export default updateCoinsDatabase;