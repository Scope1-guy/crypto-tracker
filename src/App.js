import { useEffect, useState } from "react";
import { firstSectionMarketDisplay } from "./crypro-info";
import { AuthProvider, useAuth } from "./components/AuthContext";
import AuthPage from "./components/AuthPage";
import CoinPage from "./pages/coins";
import WatchlistPage from "./pages/watchlist";
import PortfolioPage from "./pages/portfolio";
import NewsPage from "./pages/news";
import AlertPage from "./pages/alert";
import SettingsPage from "./pages/settings";
import BlogPage from "./pages/blog/BlogPage";

// ─── Icon helpers ────────────────────────────────────────────────────────────
const ICONS = {
  Dashboard: "🏠",
  CoinPage: "🪙",
  Watchlist: "⭐",
  Portfolio: "💼",
  News: "📰",
  Alert: "🔔",
  Blog: "✍️",
  Settings: "⚙️",
};

// ─── Number formatter ────────────────────────────────────────────────────────
function formatNumber(num) {
  if (!num && num !== 0) return "N/A";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toLocaleString();
}

// ─── App shell ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="loading-screen">
        <p>Loading…</p>
      </div>
    );
  }

  if (!user) return <AuthPage />;
  return <Dashboard />;
}

// ─── Main dashboard (post-login) ─────────────────────────────────────────────
function Dashboard() {
  const sideBarItems = [
    "Dashboard",
    "CoinPage",
    "Watchlist",
    "Portfolio",
    "News",
    "Alert",
    "Blog",
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
        setSelectedCoin(data[0] || null);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      }
    }
    fetchCoins();
  }, []);

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

// ─── Page router ──────────────────────────────────────────────────────────
function CurrentPage({
  activePage,
  cryptoCoins,
  selectedCoin,
  setSelectedCoin,
}) {
  const pageMap = {
    Dashboard: (
      <MainPage
        cryptoCoins={cryptoCoins}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
    ),
    CoinPage: <CoinPage />,
    Watchlist: <WatchlistPage />,
    Portfolio: <PortfolioPage />,
    News: <NewsPage />,
    Alert: <AlertPage />,
    Blog: <BlogPage />,
    Settings: <SettingsPage />,
  };

  return (
    pageMap[activePage] || (
      <div className="generic-page">
        <h1>Coming Soon</h1>
      </div>
    )
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ sideBarItems, activePage, setActivePage }) {
  const { user, logout } = useAuth();

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

      {user && (
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user.displayName?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-display-name">{user.displayName}</span>
            <span className="sidebar-username">@{user.username}</span>
          </div>
        </div>
      )}

      <ul className="sidebar-list">
        {sideBarItems.map((item) => (
          <li
            key={item}
            onClick={() => setActivePage(item)}
            className={activePage === item ? "page-activeness" : ""}
          >
            <span className="sidebar-icon">{ICONS[item] || "•"}</span>
            {item === "CoinPage" ? "Coins" : item}
          </li>
        ))}
      </ul>

      <div className="sidebar-bottom">
        <label
          className="theme-switch"
          title={lightTheme ? "Switch to dark" : "Switch to light"}
        >
          <input
            type="checkbox"
            id="themeToggle"
            checked={lightTheme}
            onChange={() => setLightTheme(!lightTheme)}
          />
          <span className="slider"></span>
        </label>
        <button className="sidebar-logout" onClick={logout} title="Log out">
          ⬡ Logout
        </button>
      </div>
    </div>
  );
}

// ─── Main / Dashboard page ────────────────────────────────────────────────────
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
  const { user } = useAuth();
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
        <div className="notification-icon">🔔</div>
        <div className="profile-image-circle">
          <div>{user?.displayName?.[0]?.toUpperCase() || "U"}</div>
          <p>▾</p>
        </div>
      </div>
    </header>
  );
}

function FirstSection({ cryptoCoins }) {
  const { user } = useAuth();

  // Live market stats derived from API data
  const totalMarketCap = cryptoCoins.reduce(
    (sum, c) => sum + (c.market_cap || 0),
    0
  );
  const totalVolume = cryptoCoins.reduce(
    (sum, c) => sum + (c.total_volume || 0),
    0
  );
  const btc = cryptoCoins.find((c) => c.id === "bitcoin");
  const btcDominance =
    btc && totalMarketCap
      ? ((btc.market_cap / totalMarketCap) * 100).toFixed(2)
      : firstSectionMarketDisplay[2].number;

  const liveStats = [
    {
      id: 1,
      title: "Market Cap",
      value: `$${formatNumber(totalMarketCap)}`,
      rate: 2.35,
    },
    {
      id: 2,
      title: "24h Volume",
      value: `$${formatNumber(totalVolume)}`,
      rate: 5.12,
    },
    { id: 3, title: "BTC Dominance", value: `${btcDominance}%`, rate: 0.68 },
    {
      id: 4,
      title: "Active Cryptos",
      value: cryptoCoins.length || firstSectionMarketDisplay[3].number,
      rate: 1.25,
    },
  ];

  return (
    <div className="first-section">
      <h2>Welcome Back, {user?.displayName}! 👋</h2>
      <p>Here's what's happening in the crypto market today</p>

      <div className="first-section-market-display">
        {liveStats.map((p) => (
          <div className="section-market" key={p.id}>
            <h5>{p.title}</h5>
            <div className="section-market-flex-display">
              <h2>{p.value}</h2>
            </div>
            <p className={p.rate >= 0 ? "rate-positive" : "rate-negative"}>
              {p.rate >= 0 ? "▲" : "▼"} {Math.abs(p.rate)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecondSection({ selectedCoin, setSelectedCoin, cryptoCoins }) {
  return (
    <div className="second-section">
      <div>
        <TopCryptocurrenciesSection
          cryptoCoins={cryptoCoins}
          setSelectedCoin={setSelectedCoin}
        />
        <LowerCryptocurrenciesSection />
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
            <th>Market Cap</th>
            <th>⭐</th>
          </tr>
        </thead>
        <tbody>
          {cryptoCoins.map((detail) => {
            const change = detail.price_change_percentage_24h;
            const changeClass = change >= 0 ? "rate-positive" : "rate-negative";
            return (
              <tr key={detail.id} onClick={() => setSelectedCoin(detail)}>
                <td>{detail.market_cap_rank}</td>
                <td>
                  <div className="crypto-name-logo">
                    <img src={detail.image} alt={detail.id} />
                    <h3>
                      {detail.name}
                      <br />
                      <span>{detail.symbol.toUpperCase()}</span>
                    </h3>
                  </div>
                </td>
                <td>${detail.current_price?.toLocaleString()}</td>
                <td className={changeClass}>
                  {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
                </td>
                <td>${formatNumber(detail.market_cap)}</td>
                <td
                  className="star-cell"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`${detail.name} added to watchlist!`);
                  }}
                >
                  ☆
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LowerCryptocurrenciesSection() {
  const NEWS = [
    {
      id: 1,
      headline:
        "Bitcoin ETFs see record inflows as institutional adoption grows",
      time: "2h ago",
      source: "CoinDesk",
    },
    {
      id: 2,
      headline: "Ethereum upgrades boost transaction speeds significantly",
      time: "4h ago",
      source: "The Block",
    },
    {
      id: 3,
      headline: "Solana DeFi TVL crosses $10B milestone",
      time: "6h ago",
      source: "DeFiLlama",
    },
  ];

  return (
    <div className="lower-cryptocurencies-section">
      <div className="lower-cryptocurencies-section-header">
        <h1>Latest Crypto News</h1>
        <button>View All</button>
      </div>
      <div className="news-container">
        {NEWS.map((n) => (
          <div className="news-box" key={n.id}>
            <div className="news-image-container"></div>
            <div className="news-box-body">
              <p>{n.headline}</p>
              <p className="news-meta">
                <span>{n.time}</span>
                <span>{n.source}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RightSideCryptoDisplay({ selectedCoin }) {
  if (!selectedCoin) {
    return (
      <div className="right-crypto-display-section">
        <p className="loading-text">Loading market data…</p>
      </div>
    );
  }

  const change = selectedCoin.price_change_percentage_24h;
  const changeClass = change >= 0 ? "rate-positive" : "rate-negative";

  return (
    <div className="right-crypto-display-section">
      <header className="right-crypto-display-section-header">
        <div className="coin-name">
          <img src={selectedCoin.image} alt={selectedCoin.id} />
          <h1>
            {selectedCoin.name} <span>{selectedCoin.symbol.toUpperCase()}</span>
          </h1>
        </div>
        <div>
          <h2>#{selectedCoin.market_cap_rank}</h2>
        </div>
      </header>

      <div className="price-rate-display">
        <h1>${selectedCoin.current_price?.toLocaleString()}</h1>
        <p className={changeClass}>
          {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}% (24h)
        </p>
      </div>

      <nav className="display-section-nav-btn">
        {["1D", "7D", "1M", "3M", "1Y", "ALL"].map((label) => (
          <button key={label}>{label}</button>
        ))}
      </nav>

      <div className="chart-display">
        <div className="chart-placeholder">
          <span>Chart coming soon</span>
        </div>
      </div>

      <div className="coin-detail-list">
        {[
          ["Market Cap", `$${formatNumber(selectedCoin.market_cap)}`],
          ["24h Volume", `$${formatNumber(selectedCoin.total_volume)}`],
          ["Circulating Supply", formatNumber(selectedCoin.circulating_supply)],
          ["Total Supply", formatNumber(selectedCoin.total_supply)],
          ["Max Supply", formatNumber(selectedCoin.max_supply)],
          ["All Time High", `$${formatNumber(selectedCoin.ath)}`],
          ["All Time Low", `$${formatNumber(selectedCoin.atl)}`],
        ].map(([label, value]) => (
          <div className="coin-details-each" key={label}>
            <h3>{label}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
