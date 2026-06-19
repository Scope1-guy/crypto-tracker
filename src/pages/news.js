import { useState, useEffect } from "react";

const NEWS_ITEMS = [
  {
    id: 1,
    headline: "Bitcoin ETFs see record inflows as institutional adoption grows",
    source: "CoinDesk",
    time: "2h ago",
  },
  {
    id: 2,
    headline: "Ethereum network upgrades boost transaction speeds by 40%",
    source: "The Block",
    time: "4h ago",
  },
  {
    id: 3,
    headline: "Solana DeFi TVL crosses $10B milestone for first time",
    source: "DeFiLlama",
    time: "6h ago",
  },
  {
    id: 4,
    headline: "Regulatory clarity in EU boosts crypto market sentiment",
    source: "Reuters",
    time: "8h ago",
  },
  {
    id: 5,
    headline: "Crypto market cap rebounds above $3 trillion",
    source: "CoinMarketCap",
    time: "10h ago",
  },
  {
    id: 6,
    headline:
      "BlackRock Bitcoin ETF surpasses gold ETF in assets under management",
    source: "Bloomberg",
    time: "12h ago",
  },
];

export default function NewsPage() {
  const [newsOnCrypto, setNewsOnCrypto] = useState([]);

  // const cryptoNewsAPI = "https://free-crypto-news.vercel.app/api/news";
  const cryptoNewsAPI = "https://crypto-portfolio-tracker-react.vercel.app/";
  // "https://crypto-portfolio-tracker-react.vercel.app/"

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(cryptoNewsAPI);
        const newsData = await response.json();
        setNewsOnCrypto(newsData);
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    }
    fetchNews();
  }, []);

  console.log(newsOnCrypto[0]);

  return (
    <div className="generic-page">
      <h1>Crypto News</h1>
      <p className="generic-page-sub">
        Latest headlines from the crypto world.
      </p>
      <div className="news-list">
        {NEWS_ITEMS.map((item) => (
          <div className="news-list-item" key={item.id}>
            <div className="news-list-img-placeholder"></div>
            <div className="news-list-body">
              <p className="news-list-headline">{item.headline}</p>
              <div className="news-list-meta">
                <span>{item.source}</span>
                <span>·</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
