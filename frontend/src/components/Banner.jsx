import React from 'react';

export default function Banner({ settings }) {
  if (!settings.announcementEnabled || !settings.announcement) {
    return null;
  }

  // Repeat the announcement to create a continuous looping effect
  const repeatedAnnouncement = Array(6).fill(settings.announcement).join(' \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ★ \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ');

  return (
    <div className="announcement-banner">
      <div className="banner-track">
        <span className="banner-item">{repeatedAnnouncement}</span>
      </div>
    </div>
  );
}
