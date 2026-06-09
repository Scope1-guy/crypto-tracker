import { useEffect, useState } from "react";
import { firstSectionMarketDisplay } from "./crypro-info";
import CoinPage from "./pages/coins";

export default function App() {
  const sideBarItems = [
    "Dashboard",
    "CoinPage",
    "Watchlist",
    "Portfolio",
    "News",
    "Alert",
    "Settings",
  ];

  const [activePage, setActivePage] = useState("Dashboard");

  const [cryptoCoins, setCryptoCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const cryptoURL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch(cryptoURL);

        const data = await response.json();

        setCryptoCoins(data);
        setSelectedCoin(data[0]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCoins();
  }, []);
  console.log(cryptoCoins);

  return (
    <div className="app">
      <Sidebar
        sideBarItems={sideBarItems}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <CurrentPage
        activePage={activePage}
        cryptoCoins={cryptoCoins}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
    </div>
  );
}

function CurrentPage({
  activePage,
  cryptoCoins,
  selectedCoin,
  setSelectedCoin,
}) {
  console.log(activePage);

  if (activePage === "Dashboard") {
    return (
      <MainPage
        cryptoCoins={cryptoCoins}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
    );
  }

  if (activePage === "CoinPage") {
    return <CoinPage />;
  }
}

function formatNumber(num) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1).replace(".0", "") + "T";
  }

  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(".0", "") + "B";
  }

  if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(".0", "") + "M";
  }

  if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(".0", "") + "K";
  }

  return num;
}

function Sidebar({ sideBarItems, activePage, setActivePage }) {
  console.log(sideBarItems, typeof sideBarItems);

  const [lightTheme, setLightTheme] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (lightTheme) {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  }, [lightTheme]);

  return (
    <div className="sidebar">
      <h1>CryptoTracker</h1>

      <ul className="sidebar-list">
        {sideBarItems.map((item) => (
          <li
            key={item}
            onClick={() => {
              // console.log("Clicked:", item);
              setActivePage(item);
              // console.log(item);
            }}
            className={activePage === item ? "page-activeness" : ""}
          >
            {item}
          </li>
        ))}
      </ul>

      <label class="theme-switch">
        <input
          type="checkbox"
          id="themeToggle"
          checked={lightTheme}
          onChange={() => {
            setLightTheme(!lightTheme);
          }}
        />
        <span class="slider"></span>
      </label>
    </div>
  );
}

function MainPage({ selectedCoin, setSelectedCoin, cryptoCoins }) {
  return (
    <div className="main-page">
      <Header />
      <FirstSection
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        cryptoCoins={cryptoCoins}
      />
      <SecondSection
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        cryptoCoins={cryptoCoins}
      />
    </div>
  );
}

function Header() {
  return (
    <header className="main-header">
      <input
        type="search"
        placeholder="Search for coins, e.g Bitcoin"
        className="main-header-input"
      />

      <div className="main-header-right-side">
        <select className="header-currency-selector">
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
          <option value="CAD">CAD</option>
        </select>

        <div className="notification-icon">&#128276;</div>
        <div className="profile-image-circle">
          <div></div>
          <p>&#9660;</p>
        </div>
      </div>
    </header>
  );
}

function FirstSection({ selectedCoin, setSelectedCoin, cryptoCoins }) {
  return (
    <div className="first-section">
      <h2>Welcome Back! &#128075;</h2>
      <p>Here's what's happening in the crypto market today</p>

      {/* <FirstSectionMarketDisplay /> */}
      <div className="first-section-market-display">
        {firstSectionMarketDisplay.map((p) => {
          return (
            <div className="section-market" key={p.id}>
              <h5>{p.title}</h5>
              <div className="section-market-flex-display">
                <h2>${formatNumber()}</h2>
                <div>
                  <img src="" alt="" />
                </div>
              </div>
              <p>undefined..%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// function FirstSectionMarketDisplay() {
//   return (
//     <div className="first-section-market-display">
//       {firstSectionMarketDisplay.map((p) => {
//         return (
//           <div className="section-market" key={p.id}>
//             <h5>{p.title}</h5>
//             <div>
//               <h2>${p.number}</h2>
//               <div></div>
//             </div>
//             <p>{p.rate}%</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

function SecondSection({ selectedCoin, setSelectedCoin, cryptoCoins }) {
  // const [selectedCoin, setSelectedCoin] = useState(cryptocurrenciesDetails[0]);

  return (
    <div className="second-section">
      <div>
        <TopCryptocurrenciesSection
          cryptoCoins={cryptoCoins}
          setSelectedCoin={setSelectedCoin}
        />
        <LowerCryptocurenciesSecion />
      </div>

      <div>
        <RightSideCryptoDisplay selectedCoin={selectedCoin} />
      </div>
    </div>
  );
}

function TopCryptocurrenciesSection({ cryptoCoins, setSelectedCoin }) {
  return (
    <div className="top-cryptocurrencies-section">
      <header className="cryptocurrencies-section-header">
        <h2>Top Cryptocurrencies</h2>
        <button>View All</button>
      </header>

      <nav className="second-section-nav">
        <button>All</button>
        <button>Favorites</button>
        <button>Trending</button>
        <button>Gainers</button>
        <button>Losers</button>
      </nav>

      <CryptocurrenciesTable
        cryptoCoins={cryptoCoins}
        setSelectedCoin={setSelectedCoin}
      />
    </div>
  );
}

function CryptocurrenciesTable({ cryptoCoins, setSelectedCoin }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Chart</th>
          </tr>
        </thead>

        <tbody>
          {cryptoCoins.map((detail) => (
            <tr
              key={detail.id}
              onClick={() => {
                setSelectedCoin(detail);
                console.log(detail);
              }}
            >
              <td>{detail.market_cap_rank}</td>
              {/* <td className="crypto-name-logo">
                <img src={detail.image} alt={detail.id} />

                <h3>
                  {detail.name} <br /> <span>{detail.symbol}</span>
                </h3>
              </td> */}
              <div className="crypto-name-logo">
                <img src={detail.image} alt={detail.id} />

                <h3>
                  {detail.name} <br />{" "}
                  <span>{detail.symbol.toUpperCase()}</span>
                </h3>
              </div>
              <td>${detail.current_price}</td>
              <td>${detail.price_change_percentage_24h}%</td>
              <td>$N/A%</td>
              <td>${formatNumber(detail.market_cap)}</td>
              <td>-</td>
              <td
                onClick={() => {
                  alert("Added to favorite");
                }}
              >
                &#9734;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LowerCryptocurenciesSecion() {
  return (
    <div className="lower-cryptocurencies-section">
      <div className="lower-cryptocurencies-section-header">
        <h1>Latest Crypto News</h1>
        <button>View All</button>
      </div>

      <div className="news-container">
        <div className="news-box">
          <div className="news-image-container"></div>
          <div>
            <div>
              <p>
                Bitcoin ETFs see record inflows as institutional adoption grows
              </p>

              <p>
                <span>2 hours ago</span>
                <span>Coindesk</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightSideCryptoDisplay({ selectedCoin }) {
  if (!selectedCoin) return <p>Loading...</p>;

  return (
    <div className="right-crypto-display-section">
      <header className="right-crypto-display-section-header">
        <div>
          <div className="coin-name">
            <img src={selectedCoin.image} alt={selectedCoin.id} />
            <h1>
              {selectedCoin.name}{" "}
              <span>{selectedCoin.symbol.toUpperCase()}</span>
            </h1>
          </div>
        </div>

        <div>
          <h2>#{selectedCoin.market_cap_rank}</h2>
          <div></div>
        </div>
      </header>

      <div className="price-rate-display">
        <h1>${selectedCoin.current_price}</h1>
        <p>{selectedCoin.price_change_percentage_24h}%(24h)</p>
      </div>

      <nav className="display-section-nav-btn">
        <button>1D</button>
        <button>7D</button>
        <button>1M</button>
        <button>3D</button>
        <button>17</button>
        <button>ALL</button>
      </nav>

      <div className="chart-display"></div>

      <div className="coin-detail-list">
        <div className="coin-details-each">
          <h3>Market Cap</h3>
          <p>${formatNumber(selectedCoin.market_cap)}</p>
        </div>

        <div className="coin-details-each">
          <h3>24h Volume</h3>
          <p>${formatNumber(selectedCoin.total_volume)}</p>
        </div>

        <div className="coin-details-each">
          <h3>Circulating Supply</h3>
          <p>${formatNumber(selectedCoin.circulating_supply)}</p>
        </div>

        <div className="coin-details-each">
          <h3>Total Supply</h3>
          <p>${formatNumber(selectedCoin.total_supply)}</p>
        </div>

        <div className="coin-details-each">
          <h3>Max Supply</h3>
          <p>${formatNumber(selectedCoin.max_supply)}</p>
        </div>

        <div className="coin-details-each">
          <h3>All Time High</h3>
          <p>${formatNumber(selectedCoin.ath)}</p>
        </div>

        <div className="coin-details-each">
          <h3>All Time Low</h3>
          <p>${formatNumber(selectedCoin.atl)}</p>
        </div>
      </div>
    </div>
  );
}
