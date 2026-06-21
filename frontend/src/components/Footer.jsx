import React from 'react';

export default function Footer({ settings }) {
  const contact = settings.contact || {};
  const isIceCream = settings.theme === 'icecream';

  return (
    <footer id="about" className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>{settings.description}</p>
          <p style={{ marginTop: '15px', fontStyle: 'italic', color: 'var(--accent)' }}>
            {isIceCream ? 'Every scoop is a little taste of heaven. 🍦' : 'Crafted with premium beans and warm hospitality. ☕'}
          </p>
        </div>

        <div className="footer-column">
          <h3>Opening Hours</h3>
          <p>{contact.hours || 'Mon-Sun: 8:00 AM - 8:00 PM'}</p>
        </div>

        <div className="footer-column">
          <h3>Find Us</h3>
          <p>📍 {contact.address || '123 Sweet Street, Dessert City'}</p>
          <p>📞 Phone: {contact.phone}</p>
          <p>✉️ Email: {contact.email}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          &copy; {new Date().getFullYear()} {settings.cafeName}. All rights reserved.
        </div>
        <div style={{ opacity: 0.8 }}>
          Powered by Cafe & Scoop Menu Builder
        </div>
      </div>
    </footer>
  );
}
