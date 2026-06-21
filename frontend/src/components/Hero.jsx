import React from 'react';
import espressoHero from '../assets/hero_espresso.png';
import icecreamHero from '../assets/hero_icecream.png';

export default function Hero({ settings }) {
  const isIceCream = settings.theme === 'icecream';
  const heroImage = isIceCream ? icecreamHero : espressoHero;

  return (
    <section 
      className="hero" 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>
      
      {isIceCream && (
        <div className="floating-shapes">
          <div className="shape shape-1" style={{ fontSize: '2.5rem' }}>🍦</div>
          <div className="shape shape-2" style={{ fontSize: '2rem' }}>🍭</div>
          <div className="shape shape-3" style={{ fontSize: '2.2rem' }}>🍓</div>
          <div className="shape shape-4" style={{ fontSize: '1.8rem' }}> sprinkles 🍧</div>
        </div>
      )}

      {!isIceCream && (
        <div className="floating-shapes">
          <div className="shape shape-1" style={{ fontSize: '2rem', opacity: 0.15 }}>☕</div>
          <div className="shape shape-2" style={{ fontSize: '1.5rem', opacity: 0.15 }}>🍂</div>
          <div className="shape shape-3" style={{ fontSize: '1.8rem', opacity: 0.15 }}>🍪</div>
          <div className="shape shape-4" style={{ fontSize: '2.2rem', opacity: 0.15 }}>☕</div>
        </div>
      )}

      <div className="hero-content">
        <h1 className="hero-title">{settings.cafeName || 'Culture & Scoop'}</h1>
        <p className="hero-subtitle">{settings.description || 'Specialty cafe and parlour experience.'}</p>
        <a href="#menu">
          <button className="hero-btn">Explore Menu</button>
        </a>
      </div>
    </section>
  );
}
