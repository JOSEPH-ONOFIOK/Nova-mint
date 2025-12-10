import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Wallet,
  TrendingUp,
  Heart,
  Twitter,
  Youtube,
  Instagram,
  Menu,
  ChevronDown,
  Bell,
  User,
  Flame,
  BarChart2,
  Home,
  Search,
  Plus
} from "lucide-react";

/* ====== LOCAL ASSETS ====== */
import madladsBanner from "./assets/mad.png";
import pudgyBanner from "./assets/pudgy logo.jpg";
import degodsBanner from "./assets/Degods logo.png";
import y00tsBanner from "./assets/yoots logg.jpg";

import madladsLogo from "./assets/mad.png";
import pudgyLogo from "./assets/pudgy logo.jpg";
import degodsLogo from "./assets/Degods logo.png";
import y00tsLogo from "./assets/yoots logg.jpg";

import madladsNft from "./assets/madlads.jpg";
import pudgyNft from "./assets/pudgy.jpg";
import degodsNft from "./assets/degods.jpg";
import y00tsNft from "./assets/yoots.jpg";

/* ========== COLLECTIONS ========== */
const COLLECTIONS = [
  {
    name: "Mad Lads",
    chain: "Solana",
    logo: madladsLogo,
    banner: madladsBanner,
    nft: madladsNft
  },
  {
    name: "DeGods",
    chain: "Solana",
    logo: degodsLogo,
    banner: degodsBanner,
    nft: degodsNft
  },
  {
    name: "y00ts",
    chain: "Polygon",
    logo: y00tsLogo,
    banner: y00tsBanner,
    nft: y00tsNft
  },
  {
    name: "Pudgy Penguins",
    chain: "Ethereum",
    logo: pudgyLogo,
    banner: pudgyBanner,
    nft: pudgyNft
  }
];

/* ===== Sparkline ===== */
const Sparkline = () => (
  <svg className="sparkline" viewBox="0 0 100 30">
    <polyline
      fill="none"
      stroke="#ff6a00"
      strokeWidth="2"
      points="0,20 20,10 40,18 60,8 80,15 100,4"
    />
  </svg>
);

/* ===== Fake NFT Generator ===== */
const generateNfts = (collection) =>
  Array.from({ length: 24 }).map((_, i) => ({
    name: `${collection.name} #${i + 1}`,
    image: collection.nft,
    price: (Math.random() * 5 + 0.1).toFixed(2),
    likes: Math.floor(Math.random() * 1200),
    rarity: Math.floor(Math.random() * 10000)
  }));

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [activeCollection, setActiveCollection] = useState(COLLECTIONS[0]);
  const [gridNfts, setGridNfts] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [activeFilter, setActiveFilter] = useState(0);

  const filters = ["All Chains", "Solana", "Ethereum", "Polygon"];

  /* Phantom wallet connect (safe demo) */
  const connectPhantom = async () => {
    if (!window.solana?.isPhantom) {
      alert("Install Phantom Wallet");
      return;
    }
    const res = await window.solana.connect();
    setWallet(res.publicKey.toString());
  };

  /* Instant NFT loading */
  useEffect(() => {
    setGridNfts(generateNfts(activeCollection));
  }, [activeCollection]);

  /* Sorting */
  const sortedNfts = [...gridNfts].sort((a, b) => {
    if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "rarity") return a.rarity - b.rarity;
    if (sortBy === "likes") return b.likes - a.likes;
    return 0;
  });

  /* Filter Collections */
  const filteredCollections =
    activeFilter === 0
      ? COLLECTIONS
      : COLLECTIONS.filter((c) => c.chain === filters[activeFilter]);

  return (
    <div className="app">

      {/* Mobile Navigation */}
      <div className="mobileNav">
        <button className="mobileBtn active"><Home size={20} /><span>Home</span></button>
        <button className="mobileBtn"><Search size={20} /><span>Explore</span></button>
        <button className="mobileBtn mid"><Plus size={22} /></button>
        <button className="mobileBtn"><Heart size={20} /><span>Favorites</span></button>
        <button className="mobileBtn"><User size={20} /><span>Profile</span></button>
      </div>

      {/* Top Nav */}
      <nav className="topNav">
        <div className="navLeft">
          <Menu size={20} />
          <div className="logo">AETHERS</div>
        </div>

        <div className="navRight">
          <div className="iconBtn"><Bell size={18} /></div>

          {!wallet ? (
            <button onClick={connectPhantom} className="connectBtn">
              Connect Wallet
            </button>
          ) : (
            <div className="walletPill">
              <Wallet size={16} />
              {wallet.slice(0, 6)}...{wallet.slice(-4)}
              <ChevronDown size={14} />
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <img src={activeCollection.banner} className="heroBannerImg" alt="" />

        <div className="heroLeft">
          <span className="badge">FEATURED</span>
          <h1>{activeCollection.name}</h1>
          <p>Instant-loading NFT demo collection.</p>

          <div className="bidCard">
            <div>
              <small>Floor Price</small>
              <strong>1.42 SOL</strong>
            </div>
            <div>
              <small>Volume</small>
              <strong>12.8K</strong>
            </div>
          </div>

          <button className="heroBtn">
            <Flame size={16} />
            Explore Collection
          </button>
        </div>

        <div className="collectionBadge">
          <img src={activeCollection.logo} className="collectionLogo" alt="" />
          <div>
            <h3>{activeCollection.name}</h3>
            <span>{activeCollection.chain}</span>
          </div>
        </div>

        <div className="filters">
          {filters.map((f, i) => (
            <span
              key={i}
              className={`chip ${activeFilter === i ? "active" : ""}`}
              onClick={() => setActiveFilter(i)}
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Main Layout */}
      <div className="layout">

        {/* Sidebar */}
        <aside className="trending">
          <h3>Collections</h3>
          {filteredCollections.map((col, i) => (
            <div
              key={i}
              className="trendCard"
              onClick={() => setActiveCollection(col)}
            >
              <img src={col.logo} alt="" />
              <div className="trendMeta">
                <strong>{col.name}</strong>
                <p>{col.chain}</p>
              </div>
              <TrendingUp size={14} />
            </div>
          ))}
        </aside>

        {/* NFT Grid */}
        <main className="grid">
          <div className="sortBar" style={{ gridColumn: "1 / -1" }}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="price">Price</option>
              <option value="rarity">Rarity</option>
              <option value="likes">Likes</option>
            </select>
          </div>

          {sortedNfts.map((nft, i) => (
            <div key={i} className="card">
              <div className="shimmer" />
              <img src={nft.image} className="nftImg" alt="" />

              <div className="meta">
                <h4>{nft.name}</h4>
                <span>{nft.price} SOL</span>
                <div className="rarity">Rank #{nft.rarity}</div>
              </div>

              <div className="cardStats">
                <Heart size={14} /> {nft.likes}
                <BarChart2 size={16} />
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Lower Panel */}
      <section className="lowerPanel">
        <div className="analytics">
          <h3>Top Collections</h3>
          {filteredCollections.map((col, i) => (
            <div key={i} className="row">
              <span>{col.name}</span>
              <Sparkline />
              <span className={i % 2 === 0 ? "up" : "down"}>
                {i % 2 === 0 ? `+8.${i}%` : `-3.${i}%`}
              </span>
            </div>
          ))}
        </div>

        <div className="featured">
          <h2>{activeCollection.name}</h2>
          <p>High demand NFT collection loaded instantly.</p>
          <button className="detailsBtn">More details →</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2 className="logo">AETHERS</h2>
        <div className="socials">
          <Twitter size={18} />
          <Youtube size={18} />
          <Instagram size={18} />
        </div>
      </footer>

    </div>
  );
}
