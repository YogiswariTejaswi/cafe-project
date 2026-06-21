import React, { useState } from 'react';

export default function AdminDashboard({ 
  menuItems, 
  settings, 
  onUpdateSettings, 
  onAddMenuItem, 
  onUpdateMenuItem, 
  onDeleteMenuItem 
}) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'settings'
  
  // Menu form states
  const [isEditingItem, setIsEditingItem] = useState(null); // holds item object if editing, or null
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'coffee',
    tags: '',
    available: true,
    dailySpecial: false
  });

  // Settings form states
  const [settingsForm, setSettingsForm] = useState({
    cafeName: settings.cafeName || '',
    description: settings.description || '',
    theme: settings.theme || 'espresso',
    announcement: settings.announcement || '',
    announcementEnabled: settings.announcementEnabled !== undefined ? settings.announcementEnabled : true,
    instagram: settings.socialMedia?.instagram || '',
    facebook: settings.socialMedia?.facebook || '',
    twitter: settings.socialMedia?.twitter || '',
    address: settings.contact?.address || '',
    hours: settings.contact?.hours || '',
    phone: settings.contact?.phone || '',
    email: settings.contact?.email || ''
  });

  // Reset menu form
  const resetMenuForm = () => {
    setIsEditingItem(null);
    setMenuForm({
      name: '',
      description: '',
      price: '',
      category: 'coffee',
      tags: '',
      available: true,
      dailySpecial: false
    });
  };

  // Handle edit click
  const handleEditClick = (item) => {
    setIsEditingItem(item.id);
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      tags: item.tags.join(', '),
      available: item.available,
      dailySpecial: item.dailySpecial
    });
  };

  // Handle menu form submit
  const handleMenuSubmit = (e) => {
    e.preventDefault();
    const formattedItem = {
      name: menuForm.name,
      description: menuForm.description,
      price: parseFloat(menuForm.price) || 0,
      category: menuForm.category,
      tags: menuForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      available: menuForm.available,
      dailySpecial: menuForm.dailySpecial
    };

    if (isEditingItem) {
      onUpdateMenuItem(isEditingItem, formattedItem);
    } else {
      onAddMenuItem(formattedItem);
    }
    resetMenuForm();
  };

  // Handle settings form submit
  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    const formattedSettings = {
      cafeName: settingsForm.cafeName,
      description: settingsForm.description,
      theme: settingsForm.theme,
      announcement: settingsForm.announcement,
      announcementEnabled: settingsForm.announcementEnabled,
      socialMedia: {
        instagram: settingsForm.instagram,
        facebook: settingsForm.facebook,
        twitter: settingsForm.twitter
      },
      contact: {
        address: settingsForm.address,
        hours: settingsForm.hours,
        phone: settingsForm.phone,
        email: settingsForm.email
      }
    };
    onUpdateSettings(formattedSettings);
    alert('Settings updated successfully! Check out your new look.');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2 className="admin-title">Manager Dashboard</h2>
        <span style={{ opacity: 0.6 }}>Modify your daily menu and branding details</span>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          📋 Menu Items
        </button>
        <button 
          className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Customize Shop
        </button>
      </div>

      {activeTab === 'menu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Add / Edit Form */}
          <div className="admin-card">
            <h3>{isEditingItem ? '✏️ Edit Menu Item' : '➕ Add Menu Item'}</h3>
            <form onSubmit={handleMenuSubmit} style={{ marginTop: '20px' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Item Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={menuForm.name}
                    onChange={e => setMenuForm({...menuForm, name: e.target.value})}
                    required 
                    placeholder="e.g. Lavender Honey Latte"
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    value={menuForm.price}
                    onChange={e => setMenuForm({...menuForm, price: e.target.value})}
                    required 
                    placeholder="e.g. 5.50"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    className="form-control"
                    value={menuForm.category}
                    onChange={e => setMenuForm({...menuForm, category: e.target.value})}
                  >
                    <option value="coffee">Coffee</option>
                    <option value="tea">Specialty Tea</option>
                    <option value="pastries">Bakery</option>
                    <option value="icecream">Ice Cream</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={menuForm.tags}
                    onChange={e => setMenuForm({...menuForm, tags: e.target.value})}
                    placeholder="e.g. Hot, Vegan, Gluten-Free"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea 
                    className="form-control" 
                    value={menuForm.description}
                    onChange={e => setMenuForm({...menuForm, description: e.target.value})}
                    required
                    placeholder="Describe ingredients or taste notes..."
                  />
                </div>
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="available" 
                    checked={menuForm.available}
                    onChange={e => setMenuForm({...menuForm, available: e.target.checked})}
                  />
                  <label htmlFor="available" style={{ cursor: 'pointer' }}>Item is Currently Available (In Stock)</label>
                </div>
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="dailySpecial" 
                    checked={menuForm.dailySpecial}
                    onChange={e => setMenuForm({...menuForm, dailySpecial: e.target.checked})}
                  />
                  <label htmlFor="dailySpecial" style={{ cursor: 'pointer' }}>Feature as Daily Special</label>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary">
                  {isEditingItem ? 'Save Changes' : 'Add Item'}
                </button>
                {(isEditingItem || menuForm.name) && (
                  <button type="button" className="btn btn-secondary" onClick={resetMenuForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Table */}
          <div className="admin-card">
            <h3>Current Menu List</h3>
            <div className="table-responsive" style={{ marginTop: '20px' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Special?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: '600' }}>
                        {item.name}
                        <div style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.6 }}>
                          {item.description}
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{item.category}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <span style={{ 
                          color: item.available ? '#2ecc71' : '#e74c3c',
                          fontWeight: 'bold'
                        }}>
                          {item.available ? '● Available' : '○ Out of Stock'}
                        </span>
                      </td>
                      <td>{item.dailySpecial ? '⭐ Yes' : 'No'}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn btn-secondary"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
                                onDeleteMenuItem(item.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="admin-card">
          <h3>⚙️ Branding & Configuration</h3>
          <form onSubmit={handleSettingsSubmit} style={{ marginTop: '20px' }}>
            <div className="form-grid">
              
              {/* Theme Selector */}
              <div className="form-group full-width">
                <label>Choose Website Theme / Layout Preset</label>
                <div className="theme-selector-group" style={{ marginTop: '10px' }}>
                  <div 
                    className={`theme-card-option ${settingsForm.theme === 'espresso' ? 'selected' : ''}`}
                    onClick={() => setSettingsForm({...settingsForm, theme: 'espresso'})}
                  >
                    <h4>☕ Cozy Espresso Cafe</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '5px' }}>
                      Deep warm colors, classic Serif typography, cozy cafe aesthetics.
                    </p>
                  </div>
                  <div 
                    className={`theme-card-option ${settingsForm.theme === 'icecream' ? 'selected' : ''}`}
                    onClick={() => setSettingsForm({...settingsForm, theme: 'icecream'})}
                  >
                    <h4>🍦 Pastel Ice Cream Parlor</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '5px' }}>
                      Vibrant pastels, friendly Sans-Serif font, playful floating shapes.
                    </p>
                  </div>
                </div>
              </div>

              {/* General Identity */}
              <div className="form-group">
                <label>Cafe / Parlor Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={settingsForm.cafeName}
                  onChange={e => setSettingsForm({...settingsForm, cafeName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Daily Special Announcement Banner</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={settingsForm.announcement}
                  onChange={e => setSettingsForm({...settingsForm, announcement: e.target.value})}
                  placeholder="Ticker message displayed at the top"
                />
              </div>

              <div className="form-group checkbox-group full-width">
                <input 
                  type="checkbox" 
                  id="announcementEnabled" 
                  checked={settingsForm.announcementEnabled}
                  onChange={e => setSettingsForm({...settingsForm, announcementEnabled: e.target.checked})}
                />
                <label htmlFor="announcementEnabled" style={{ cursor: 'pointer' }}>
                  Enable Announcement Banner at Top
                </label>
              </div>

              <div className="form-group full-width">
                <label>Short Description (Tagline)</label>
                <textarea 
                  className="form-control" 
                  value={settingsForm.description}
                  onChange={e => setSettingsForm({...settingsForm, description: e.target.value})}
                  required
                />
              </div>

              {/* Social links */}
              <div className="form-group full-width" style={{ margin: '10px 0 0 0', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
                <h4>🔗 Connect Social Accounts</h4>
              </div>

              <div className="form-group">
                <label>Instagram URL</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={settingsForm.instagram}
                  onChange={e => setSettingsForm({...settingsForm, instagram: e.target.value})}
                  placeholder="https://instagram.com/yourbrand"
                />
              </div>

              <div className="form-group">
                <label>Facebook URL</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={settingsForm.facebook}
                  onChange={e => setSettingsForm({...settingsForm, facebook: e.target.value})}
                  placeholder="https://facebook.com/yourbrand"
                />
              </div>

              <div className="form-group">
                <label>Twitter / X URL</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={settingsForm.twitter}
                  onChange={e => setSettingsForm({...settingsForm, twitter: e.target.value})}
                  placeholder="https://twitter.com/yourbrand"
                />
              </div>

              {/* Contact info */}
              <div className="form-group full-width" style={{ margin: '10px 0 0 0', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
                <h4>📍 Hours & Contact Information</h4>
              </div>

              <div className="form-group">
                <label>Business Address</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={settingsForm.address}
                  onChange={e => setSettingsForm({...settingsForm, address: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Opening Hours Info</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={settingsForm.hours}
                  onChange={e => setSettingsForm({...settingsForm, hours: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={settingsForm.phone}
                  onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={settingsForm.email}
                  onChange={e => setSettingsForm({...settingsForm, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                Save Configurations
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
