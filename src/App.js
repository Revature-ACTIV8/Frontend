import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">ACTIV8</div>
          <div className="nav-links">
            <a href="#new">New In</a>
            <a href="#women">Women</a>
            <a href="#men">Men</a>
          </div>
        </div>
        <div className="nav-right">
          <button className="icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button className="icon-button cart-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-count">0</span>
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-banner">
          <img src="https://res.cloudinary.com/dz8avfbml/image/upload/v1760449412/ICEBREAKERCOLLECTIONBANNER2_zh48ms.png" alt="Fashion Banner" />
          <div className="hero-content">
            <button className="shop-now-button">
              <span>SHOP NOW</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
