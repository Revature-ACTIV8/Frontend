import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './App.css';




function App() {

  const banners = [
    "https://res.cloudinary.com/dz8avfbml/image/upload/v1760449412/ICEBREAKERCOLLECTIONBANNER2_zh48ms.png",
    "https://res.cloudinary.com/dz8avfbml/image/upload/v1760551379/sleeper_build_collection_epwb1i.png"
  ];

  

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src="https://res.cloudinary.com/dz8avfbml/image/upload/v1760469987/LogoTransparent2_lvh03b.png" alt="ACTIV8 Logo"/>
          </div>
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
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        speed={800}                  // slide animation duration (ms)
        className="hero-swiper"
      >
      {banners.map((src, i) => (
        <SwiperSlide key={i}>
          <div className="hero-banner">
            <img src={src} alt={`Banner ${i + 1}`} />
            <div className="hero-content">
              <button className={`shop-now-button-${i}`}>
                <span>SHOP NOW</span>
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
      </Swiper>
      </section>

      <section className="afterCarousel">
        <div className="subsection-container">

          {/* LEFT — Top Selling */}
          <div className="top-selling">
            <h2 className="section-title">Top Selling</h2>

            <div className="top-selling-grid">
              {/* Hero (tall) image */}
              <div className="top-item larger-top-selling-item">
                <img
                  src="https://images.asos-media.com/products/adidas-performance-three-stripes-studios-jersey-shorts-in-brown/208941695-3?$n_960w$&wid=952&fit=constrain"
                  alt="Primary view"
                  className="image primary"
                />
                <img
                  src="https://images.asos-media.com/products/adidas-performance-three-stripes-studios-jersey-shorts-in-brown/208941695-2?$n_960w$&wid=952&fit=constrain"
                  alt="Alternate view"
                  className="image secondary"
                />
              </div>

              {/* Smaller right-side images */}
              <div className="top-item small-item">
                <img
                  src="https://res.cloudinary.com/dz8avfbml/image/upload/v1760474029/man_x99za2.png"
                  alt="Primary view"
                  className="image primary"
                />
                <img
                  src="https://res.cloudinary.com/dz8avfbml/image/upload/v1760474028/man1_exzbjl.png"
                  alt="Alternate view"
                  className="image secondary"
                />
              </div>
              <div className="top-item small-item">
                <img
                  src="https://res.cloudinary.com/dz8avfbml/image/upload/v1760474028/shoe_zgdf2m.png"
                  alt="Primary view"
                  className="image primary"
                />
                <img
                  src="https://res.cloudinary.com/dz8avfbml/image/upload/v1760474028/shoe1_xussdm.png"
                  alt="Alternate view"
                  className="image secondary"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — Genres */}
          <div className="genres">
            <div className="genre-card">
              <h3>Men</h3>
            </div>
            <div className="genre-card">
              <h3>Women</h3>
            </div>
            <div className="genre-card">
              <h3>New in</h3>
            </div>
            <div className="genre-card">
              <h3>Activewear</h3>
            </div>
            <div className="genre-card">
              <h3>Shoes</h3>
            </div>
            <div className="genre-card">
              <h3>Accessories</h3>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer-container">
          <div class="footer-left">
            <h3>ACTIV8</h3>
            <p>by FYK</p>
          </div>

          <div class="footer-center">
            <ul class="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Search</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div class="footer-right">
            <p>&copy; 2025 Min, Chris, and Hasan, No rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
