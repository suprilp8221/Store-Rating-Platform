# 🚀 Render Deployment Guide - StoreRating Pro

## Quick Start (5 Minutes)

### Step 1: Prepare Your Repository
```bash
# Ensure your code is on GitHub
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Create Render Services

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login with GitHub**
3. **Create 3 services:**

#### 🔧 Backend Service (Web Service)
- Click "New +" → "Web Service"
- **Connect Repository:** Your GitHub repo
- **Name:** `store-rating-backend`
- **Root Directory:** `backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Free (or Starter for production)

#### 🗄️ Database Service (PostgreSQL)
- Click "New +" → "PostgreSQL"
- **Name:** `store-rating-db`
- **Database:** `platformDB`
- **Plan:** Free (or Starter for production)

#### 🎨 Frontend Service (Static Site)
- Click "New +" → "Static Site"
- **Connect Repository:** Same GitHub repo
- **Name:** `store-rating-frontend`
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### Step 3: Configure Environment Variables

#### Backend Environment Variables:
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
```

#### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend-service.onrender.com/api
```

### Step 4: Database Setup

1. **Connect to your PostgreSQL database**
2. **Run this SQL schema:**

```sql
-- Create tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  role VARCHAR(20) DEFAULT 'Normal User' CHECK (role IN ('System Administrator', 'Normal User', 'Store Owner'))
);

CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL,
  address VARCHAR(400) NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  UNIQUE(user_id, store_id)
);

-- Create admin user (password: Admin@123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator');
```

### Step 5: Update Code for PostgreSQL

#### Update `backend/config/db.js`:
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function testConnection() {
  try {
    await pool.getConnection();
    console.log('Successfully connected to PostgreSQL database.');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error.message);
    process.exit(1);
  }
}

module.exports = {
  pool,
  testConnection
};
```

#### Update `backend/package.json`:
```json
{
  "name": "rating-platform-backend",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "node app.js"
  },
  "engines": {
    "node": "18.x"
  },
  "dependencies": {
    "bcryptjs": "^3.0.2",
    "body-parser": "^2.2.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.11.3"
  }
}
```

#### Update `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default API_BASE_URL;
```

### Step 6: Deploy

```bash
# Push changes to GitHub
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

**Render will automatically deploy all services!** 🎉

## 🔗 Your Live URLs

After deployment, you'll get:
- **Backend API:** `https://store-rating-backend.onrender.com`
- **Frontend App:** `https://store-rating-frontend.onrender.com`
- **Database:** Internal PostgreSQL connection

## 🧪 Test Your Deployment

1. **Visit your frontend URL**
2. **Try logging in with:**
   - Email: `admin@example.com`
   - Password: `Admin@123`
3. **Test all user roles and functionalities**

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Failed:**
   - Check `DATABASE_URL` environment variable
   - Ensure PostgreSQL service is running

2. **CORS Errors:**
   - Update CORS origin in backend
   - Check frontend API URL

3. **Build Failures:**
   - Check Node.js version (18.x)
   - Verify all dependencies are installed

### Render Dashboard:
- Monitor logs in Render dashboard
- Check service health status
- View build and deployment logs

## 💡 Pro Tips

1. **Free Tier Limitations:**
   - Services sleep after 15 minutes of inactivity
   - Limited to 750 hours/month
   - Consider upgrading for production

2. **Environment Variables:**
   - Use strong JWT secrets
   - Keep database credentials secure
   - Use different secrets for different environments

3. **Monitoring:**
   - Set up uptime monitoring
   - Monitor database performance
   - Check application logs regularly

---

**🎉 Congratulations! Your StoreRating Pro app is now live on Render!**







