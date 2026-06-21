import React from 'react';

export default function Navigation({ settings, isAdminView, setIsAdminView }) {
  const isIceCreamTheme = settings.theme === 'icecream';

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <a href="/" className="navbar-brand" onClick={(e) => { e.preventDefault(); setIsAdminView(false); }}>
          <span style={{ fontSize: '1.8rem' }}>{isIceCreamTheme ? '🍦' : '☕'}</span>
          <span>{settings.cafeName || 'Cafe & Scoop'}</span>
        </a>

        <div className="navbar-links">
          {!isAdminView ? (
            <>
              <a href="#menu" className="nav-link">Menu</a>
              <a href="#gallery" className="nav-link">Gallery</a>
              <a href="#about" className="nav-link">Hours & Contact</a>
            </>
          ) : (
            <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); setIsAdminView(false); }}>
              ← Back to Shop
            </a>
          )}
          <button 
            className="admin-toggle-btn"
            onClick={() => setIsAdminView(!isAdminView)}
          >
            {isAdminView ? 'View Shop' : 'Admin Panel ⚙️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
