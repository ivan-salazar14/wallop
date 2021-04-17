import axios from "axios";

async function getMarket(prefer_coin: string, page: number = 1, per_page: number = 100): Promise<any> {
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
                const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
                let result = await res.data.map(({ symbol, current_price, name, image, last_updated }) => ({ symbol, current_price, name, image, last_updated }));
                return result;
            });
    return currency;

}

const coinPrices = async (ids: string, prefer_coin: string) => {
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
}
export default {
    getMarket,
    coinPrices
};