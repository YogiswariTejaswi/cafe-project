const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'data', 'database.json');

// Helper function to read DB
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file:', error);
    return { settings: {}, menuItems: [] };
  }
};

// Helper function to write DB
const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing database file:', error);
    return false;
  }
};

// 1. Get entire database state
app.get('/api/state', (req, res) => {
  const db = readDB();
  res.json(db);
});

// 2. Get menu items
app.get('/api/menu', (req, res) => {
  const db = readDB();
  res.json(db.menuItems);
});

// 3. Add menu item
app.post('/api/menu', (req, res) => {
  const db = readDB();
  const newItem = {
    id: Date.now().toString(),
    name: req.body.name || 'Unnamed Item',
    description: req.body.description || '',
    price: parseFloat(req.body.price) || 0,
    category: req.body.category || 'coffee',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    available: req.body.available !== undefined ? req.body.available : true,
    dailySpecial: req.body.dailySpecial !== undefined ? req.body.dailySpecial : false
  };

  db.menuItems.push(newItem);
  if (writeDB(db)) {
    res.status(201).json(newItem);
  } else {
    res.status(500).json({ error: 'Failed to save item to database' });
  }
});

// 4. Update menu item
app.put('/api/menu/:id', (req, res) => {
  const db = readDB();
  const itemIndex = db.menuItems.findIndex(item => item.id === req.params.id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const updatedItem = {
    ...db.menuItems[itemIndex],
    name: req.body.name !== undefined ? req.body.name : db.menuItems[itemIndex].name,
    description: req.body.description !== undefined ? req.body.description : db.menuItems[itemIndex].description,
    price: req.body.price !== undefined ? parseFloat(req.body.price) : db.menuItems[itemIndex].price,
    category: req.body.category !== undefined ? req.body.category : db.menuItems[itemIndex].category,
    tags: Array.isArray(req.body.tags) ? req.body.tags : db.menuItems[itemIndex].tags,
    available: req.body.available !== undefined ? req.body.available : db.menuItems[itemIndex].available,
    dailySpecial: req.body.dailySpecial !== undefined ? req.body.dailySpecial : db.menuItems[itemIndex].dailySpecial
  };

  db.menuItems[itemIndex] = updatedItem;
  if (writeDB(db)) {
    res.json(updatedItem);
  } else {
    res.status(500).json({ error: 'Failed to save update to database' });
  }
});

// 5. Delete menu item
app.delete('/api/menu/:id', (req, res) => {
  const db = readDB();
  const itemIndex = db.menuItems.findIndex(item => item.id === req.params.id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  db.menuItems.splice(itemIndex, 1);
  if (writeDB(db)) {
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete item from database' });
  }
});

// 6. Get settings
app.get('/api/settings', (req, res) => {
  const db = readDB();
  res.json(db.settings);
});

// 7. Update settings
app.put('/api/settings', (req, res) => {
  const db = readDB();
  db.settings = {
    ...db.settings,
    cafeName: req.body.cafeName !== undefined ? req.body.cafeName : db.settings.cafeName,
    description: req.body.description !== undefined ? req.body.description : db.settings.description,
    theme: req.body.theme !== undefined ? req.body.theme : db.settings.theme,
    announcement: req.body.announcement !== undefined ? req.body.announcement : db.settings.announcement,
    announcementEnabled: req.body.announcementEnabled !== undefined ? req.body.announcementEnabled : db.settings.announcementEnabled,
    socialMedia: {
      ...db.settings.socialMedia,
      ...req.body.socialMedia
    },
    contact: {
      ...db.settings.contact,
      ...req.body.contact
    }
  };

  if (writeDB(db)) {
    res.json(db.settings);
  } else {
    res.status(500).json({ error: 'Failed to save settings to database' });
  }
});

// Serve frontend in production (optional, good to have)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
