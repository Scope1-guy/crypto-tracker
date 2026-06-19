import { useEffect, useState } from "react";

function formatNumber(num) {
  if (!num && num !== 0) return "N/A";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toLocaleString();
}

export default function CoinPage() {
  const [coinPageList, SetCoinPageList] = useState([]);

  const cryptoURL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch(cryptoURL);
        const data = await response.json();
        SetCoinPageList(data);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      }
    }
    fetchCoins();
  }, []);

  console.log(coinPageList);

  return (
    <div className="generic-page">
      <h1>All Coins</h1>
      <p className="generic-page-sub">Browse all tracked cryptocurrencies.</p>

      <div className="coin-page-grid">
        {coinPageList.map((coin) => {
          const changeClass =
            coin.market_cap_change_percentage_24h >= 1
              ? "rate-positive"
              : "rate-negative";
          return (
            <div className="coin-card" key={coin.id}>
              <div className="coin-card-header">
                <div className="coin-card-rank">#{coin.market_cap_rank}</div>
                <div className="coin-card-name">
                  <strong>{coin.name}</strong>
                  <span className="coin-card-symbol">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="coin-card-price">
                ${coin.current_price.toLocaleString()}
              </div>

              <div className={`coin-card-change ${changeClass}`}>
                {coin.market_cap_change_percentage_24h >= 1 ? "▲" : "▼"}
                {Math.abs(coin.market_cap_change_percentage_24h)}% (24h)
              </div>

              <div className="coin-card-details">
                <div className="coin-card-row">
                  <span>Market Cap</span>
                  <span>${formatNumber(coin.market_cap)}</span>
                </div>
                <div className="coin-card-row">
                  <span>Circulating</span>
                  <span>{formatNumber(coin.max_supply)}</span>
                </div>
                <div className="coin-card-row">
                  <span>ATH</span>
                  <span>${coin.ath.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
