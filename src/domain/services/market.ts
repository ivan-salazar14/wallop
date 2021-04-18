import axios from "axios";
import coinService from "./coin";

const ping = async () => {
    try {
        return (await axios.get("https://api.coingecko.com/api/v3/ping")).data
    } catch (error) {
        console.log(error)
    }
}

async function getMarket(prefer_coin: string, page: number = 1, per_page: number = 100): Promise<any> {
    return await ping().then(() => {
        let currency =
            axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    per_page: per_page,
                    page: page,
                    order: "market_cap_desc",
                    sparkline: false,
                    vs_currency: prefer_coin
                }
            })
                .then(async res => {
                    let result = await res.data.map(
                        ({ symbol, current_price, name, image, last_updated }) => {
                            coinService.setImage(
                                symbol,
                                image
                            );
                            return ({ symbol, current_price, name, image, last_updated })
                        });

                    return result;
                });

        return currency;
    }).catch((error) => { return error });

}

const coinPrices = async (ids: string, prefer_coin: string) => {
    return await ping().then(() => {
        return axios.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
                ids,
                vs_currencies: prefer_coin,
                include_last_updated_at: true
            }
        }).then(async res => {
            return res.data;
        }
        )
    }).catch((error) => { return error });

}
const getCoins = async () => {
    return await ping().then(() => {
        try {
            return axios.get("https://api.coingecko.com/api/v3/coins/list?include_platform=false")

        } catch (error) {
            console.log(error)
        }
    }).catch((error) => { return error });

}

const getCurrencies = async () => {
    return await ping().then(() => {
        try {
            return axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
        } catch (error) {
            console.log(error)
        }
    }).catch((error) => { return error });
}

export default {
    ping,
    getMarket,
    coinPrices,
    getCoins,
    getCurrencies
};