import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import SocialFeed from './components/SocialFeed';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : '/api';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [settings, setSettings] = useState({
    cafeName: 'Culture & Scoop',
    description: 'Loading...',
    theme: 'espresso',
    announcement: '',
    announcementEnabled: false,
    socialMedia: {},
    contact: {}
  });
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, settingsRes] = await Promise.all([
          fetch(`${API_BASE}/menu`),
          fetch(`${API_BASE}/settings`)
        ]);

        if (!menuRes.ok || !settingsRes.ok) {
          throw new Error('Failed to load data from server.');
        }

        const menuData = await menuRes.json();
        const settingsData = await settingsRes.json();

        setMenuItems(menuData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching API data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update branding and settings
  const handleUpdateSettings = async (updatedSettings) => {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });

      if (!res.ok) throw new Error('Failed to update settings');

      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error(error);
      alert('Error updating settings.');
    }
  };

  // Add menu item
  const handleAddMenuItem = async (newItem) => {
    try {
      const res = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (!res.ok) throw new Error('Failed to add item');

      const addedItem = await res.json();
      setMenuItems(prev => [...prev, addedItem]);
    } catch (error) {
      console.error(error);
      alert('Error adding menu item.');
    }
  };

  // Update menu item
  const handleUpdateMenuItem = async (itemId, updatedFields) => {
    try {
      const res = await fetch(`${API_BASE}/menu/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });

      if (!res.ok) throw new Error('Failed to update item');

      const updatedItem = await res.json();
      setMenuItems(prev => prev.map(item => item.id === itemId ? updatedItem : item));
    } catch (error) {
      console.error(error);
      alert('Error updating menu item.');
    }
  };

  // Delete menu item
  const handleDeleteMenuItem = async (itemId) => {
    try {
      const res = await fetch(`${API_BASE}/menu/${itemId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete item');

      setMenuItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error(error);
      alert('Error deleting menu item.');
    }
  };

  if (isLoading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2rem',
        background: '#fcfaf7',
        color: '#a06e52'
      }}>
        ☕ Churning fresh cream and brewing coffee...
      </div>
    );
  }

  // Active theme wrapper class
  const themeClass = settings.theme === 'icecream' ? 'theme-icecream' : 'theme-espresso';

  return (
    <div className={`app-container ${themeClass}`}>
      <Banner settings={settings} />
      <Navigation 
        settings={settings} 
        isAdminView={isAdminView} 
        setIsAdminView={setIsAdminView} 
      />

      {isAdminView ? (
        <AdminDashboard 
          menuItems={menuItems}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onAddMenuItem={handleAddMenuItem}
          onUpdateMenuItem={handleUpdateMenuItem}
          onDeleteMenuItem={handleDeleteMenuItem}
        />
      ) : (
        <div className="animate-fade-in">
          <Hero settings={settings} />
          <MenuSection menuItems={menuItems} />
          <SocialFeed settings={settings} />
        </div>
      )}

      <Footer settings={settings} />
    </div>
  );
}

export default App;
