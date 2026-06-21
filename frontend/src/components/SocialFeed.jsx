import React from 'react';
import post1 from '../assets/instagram_post_1.png';
import post2 from '../assets/instagram_post_2.png';
import post3 from '../assets/instagram_post_3.png';

export default function SocialFeed({ settings }) {
  const social = settings.socialMedia || {};

  const mockPosts = [
    {
      id: 1,
      image: post1,
      caption: "Starting the morning right with our House Blend latte art. ☕✨ #latteart #specialtycoffee",
      likes: "142 likes"
    },
    {
      id: 2,
      image: post2,
      caption: "Double scoop of Salted Caramel & Strawberry on a hot summer afternoon! 🍦☀️ #icecream #artisanal",
      likes: "258 likes"
    },
    {
      id: 3,
      image: post3,
      caption: "Freshly baked butter croissants out of the oven! Get them while they're warm. 🥐😋 #bakery #fresh",
      likes: "189 likes"
    }
  ];

  return (
    <section id="gallery" className="social-feed-section">
      <div className="section-header">
        <h2 className="section-title">Follow Our Journey</h2>
        <p className="social-feed-subtitle">See what we're crafting daily on social media</p>
      </div>

      <div className="social-grid">
        {mockPosts.map(post => (
          <div 
            key={post.id} 
            className="social-post-card"
            style={{ backgroundImage: `url(${post.image})` }}
          >
            <div className="social-post-overlay">
              <span className="social-post-icon">📸</span>
              <p className="social-post-caption">{post.caption}</p>
              <span style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 'bold' }}>
                ❤️ {post.likes}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="social-link-buttons">
        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="social-btn">
            <span>📷</span> Instagram
          </a>
        )}
        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="social-btn">
            <span>👤</span> Facebook
          </a>
        )}
        {social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
            <span>🐦</span> Twitter / X
          </a>
        )}
      </div>
    </section>
  );
}
