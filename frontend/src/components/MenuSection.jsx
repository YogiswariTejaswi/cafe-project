import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'all', name: '✨ All Items' },
  { id: 'coffee', name: '☕ Coffee' },
  { id: 'tea', name: '🍵 Specialty Teas' },
  { id: 'pastries', name: '🥐 Bakery' },
  { id: 'icecream', name: '🍦 Ice Cream' },
  { id: 'specials', name: '🌟 Daily Specials' }
];

// Helper to get card background design
const getCardStyle = (category, name) => {
  const normalized = name.toLowerCase();
  
  if (category === 'coffee') {
    return {
      background: 'linear-gradient(135deg, #4b3621, #2b1d0c)',
      emoji: '☕'
    };
  }
  if (category === 'tea') {
    if (normalized.includes('matcha')) {
      return {
        background: 'linear-gradient(135deg, #5b8c5a, #2f592e)',
        emoji: '🍵'
      };
    }
    return {
      background: 'linear-gradient(135deg, #c4a482, #8b5a2b)',
      emoji: '🫖'
    };
  }
  if (category === 'pastries') {
    return {
      background: 'linear-gradient(135deg, #e4b373, #b8860b)',
      emoji: '🥐'
    };
  }
  if (category === 'icecream') {
    if (normalized.includes('caramel')) {
      return {
        background: 'linear-gradient(135deg, #f3a663, #c2691e)',
        emoji: '🍧'
      };
    }
    if (normalized.includes('strawberry') || normalized.includes('berry')) {
      return {
        background: 'linear-gradient(135deg, #ff8da1, #d44d64)',
        emoji: '🍓'
      };
    }
    return {
      background: 'linear-gradient(135deg, #ffd3b6, #ff8b94)',
      emoji: '🍦'
    };
  }
  
  // Default gradient
  return {
    background: 'linear-gradient(135deg, #a06e52, #594744)',
    emoji: '⭐'
  };
};

export default function MenuSection({ menuItems }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = menuItems.filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'specials') return item.dailySpecial;
    return item.category === activeCategory;
  });

  return (
    <section id="menu" className="menu-section">
      <div className="section-header">
        <h2 className="section-title">Our Regular Menu</h2>
      </div>

      <div className="filter-container">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.6 }}>
          No items found in this category.
        </div>
      ) : (
        <div className="menu-grid">
          {filteredItems.map(item => {
            const cardStyle = getCardStyle(item.category, item.name);
            return (
              <div 
                key={item.id} 
                className={`menu-card ${!item.available ? 'out-of-stock' : ''}`}
              >
                <div 
                  className="menu-card-header"
                  style={{ background: cardStyle.background }}
                >
                  <div className="menu-card-img-placeholder">
                    <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
                      {cardStyle.emoji}
                    </span>
                  </div>

                  <div className="menu-card-badges">
                    {item.dailySpecial && <span className="badge special">Special</span>}
                    {!item.available && <span className="badge">Out of Stock</span>}
                  </div>
                </div>

                <div className="menu-card-body">
                  <h3 className="menu-card-title">{item.name}</h3>
                  <p className="menu-card-desc">{item.description}</p>
                  
                  <div className="menu-card-footer">
                    <span className="menu-card-price">${item.price.toFixed(2)}</span>
                    <div className="menu-card-tags">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="tag-label">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
