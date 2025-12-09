import React from "react";
import "./App.css";
import {
  Bell,
  User,
  Wallet,
  Flame,
  TrendingUp,
  Heart,
  BarChart2,
  Twitter,
  Youtube,
  Instagram,
  Menu,
   Home,
  Search,
  Plus,
  ChevronDown
} from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf",
  "https://images.unsplash.com/photo-1643101453922-3f6e2fbc65f6",
  "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6"
];

const trending = [
  {
    title: "Degods",
    price: "0.82 SOL",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
  },
  {
    title: "Bored Ape",
    price: "1.45 SOL",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
  },
  {
    title: "Cool Monks",
    price: "0.69 SOL",
    image: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf"
  }
];

const collections = Array.from({ length: 12 }).map((_, i) => ({
  name: [
    "Mad Lads",
    "Pudgy Penguins",
    "The U",
    "Mini Creatures",
    "Zuko",
    "Skull Heads"
  ][i % 6],
  price: `${(Math.random() * 2).toFixed(2)} SOL`,
  image: `https://picsum.photos/seed/nft${i}/320/320`,
  likes: Math.floor(Math.random() * 500) + 20
}));

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

export default function App() {
  return (
    <div className="app">
     
     {/* ───────── Mobile Bottom Navigation ───────── */}
<div className="mobileNav">
  <button className="mobileBtn active">
    <Home size={20} />
    <span>Home</span>
  </button>

  <button className="mobileBtn">
    <Search size={20} />
    <span>Explore</span>
  </button>

  <button className="mobileBtn mid">
    <Plus size={22} />
  </button>

  <button className="mobileBtn">
    <Heart size={20} />
    <span>Favorites</span>
  </button>

  <button className="mobileBtn">
    <User size={20} />
    <span>Profile</span>
  </button>
</div>

      {/* TOP NAV */}
      <nav className="topNav">
        <div className="navLeft">
          <Menu size={20} />
          <div className="logo">NOVAMINT</div>
        </div>

        <input className="search" placeholder="Search collection..." />

        <div className="navRight">
          <div className="iconBtn"><Bell size={18} /></div>
          <div className="iconBtn"><User size={18} /></div>
          <div className="walletPill">
            <Wallet size={16} />
            1.57 SOL <ChevronDown size={14} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="heroLeft">
          <span className="badge">INVADERS</span>
          <h1>Invaders Collection</h1>
          <p>Discover rare robot NFTs across multichain marketplaces.</p>

          <div className="bidCard">
            <div>
              <small>Current Bid</small>
              <strong>1.42 SOL</strong>
            </div>
            <div>
              <small>Ending In</small>
              <strong>12h 42m</strong>
            </div>
          </div>

          <button className="heroBtn">
            <Flame size={16} />
            Place a Bid
          </button>

          <div className="filters mobileScroll">
            {["All Chains", "Solana", "Ethereum", "Bitcoin"].map((f, i) => (
              <span key={i} className={`chip ${i === 0 ? "active" : ""}`}>
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="heroImages">
          {heroImages.map((src, i) => (
            <img key={i} src={src} className={`heroImg img${i}`} alt="" />
          ))}
        </div>

        <div className="stats">
          {["$138", "$91,528", "$3,148"].map((v, i) => (
            <div key={i} className="statPill">{v}</div>
          ))}
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="layout">

        {/* TRENDING */}
        <aside className="trending">
          <h3>Trending</h3>
          {trending.map((item, i) => (
            <div key={i} className="trendCard">
              <img src={item.image} alt="" />
              <div className="trendMeta">
                <strong>{item.title}</strong>
                <p>{item.price}</p>
              </div>
              <TrendingUp size={14} />
            </div>
          ))}
        </aside>

        {/* NFT GRID */}
        <main className="grid">
          {collections.map((nft, i) => (
            <div key={i} className="card">
              <div className="shimmer" />
              <img src={nft.image} alt="" />

              <div className="meta">
                <h4>{nft.name}</h4>
                <span>{nft.price}</span>
              </div>

              <div className="cardStats">
                <span className="likes">
                  <Heart size={14} /> {nft.likes}
                </span>
                <BarChart2 size={16} />
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* ANALYTICS + FEATURED */}
      <section className="lowerPanel">
        <div className="analytics">
          <h3>Top Collections</h3>
          {["Mad Lads", "Invaders", "Zuko", "Skull Heads"].map((name, i) => (
            <div key={i} className="row">
              <span>{name}</span>
              <Sparkline />
              <span className={i === 2 ? "down" : "up"}>
                {i === 2 ? "-3.2%" : "+8." + i + "%"}
              </span>
            </div>
          ))}
        </div>

        <div className="featured">
          <h2>MADLADS</h2>
          <p>
            Mad Lads is a collection of 8,888 unique NFTs built on Solana.
          </p>
          <button className="detailsBtn">More details →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="about">
          <h2>NovaMint</h2>
          <p>
            The next-generation multichain NFT hub — discover, trade and mint.
          </p>

          <div className="socials">
            <Twitter size={18} />
            <Youtube size={18} />
            <Instagram size={18} />
          </div>
        </div>
      </footer>

    </div>
  );
}
