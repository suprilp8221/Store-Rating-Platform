# 🚀 StoreRating Pro - Deployment Guide

This guide covers multiple deployment options for the StoreRating Pro full-stack application.

## 📋 Prerequisites

- Node.js (v16.x or later)
- MySQL database
- Git
- Cloud platform account (Heroku, Railway, Vercel, etc.)

## 🏗️ Deployment Options

### Option 1: Heroku (Recommended for Beginners)

#### Backend Deployment (Heroku)

1. **Prepare Backend for Heroku:**
   ```bash
   cd backend
   ```

2. **Update package.json scripts:**
   ```json
   {
     "scripts": {
       "start": "node app.js",
       "dev": "node app.js"
     }
   }
   ```

3. **Create Procfile in backend directory:**
   ```
   web: node app.js
   ```

4. **Deploy to Heroku:**
   ```bash
   # Install Heroku CLI
   # Login to Heroku
   heroku login
   
   # Create Heroku app
   heroku create your-app-name-backend
   
   # Add MySQL addon
   heroku addons:create cleardb:ignite
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-super-secret-jwt-key
   heroku config:set PORT=3000
   
   # Deploy
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

#### Frontend Deployment (Vercel)

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

3. **Update API URLs in frontend:**
   - Update `frontend/src/services/api.js` with your Heroku backend URL
   - Example: `const API_BASE_URL = 'https://your-app-name-backend.herokuapp.com/api'`

### Option 2: Railway (Full-Stack)

1. **Connect GitHub Repository:**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Configure Services:**
   - **Backend Service:**
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
   
   - **Frontend Service:**
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Start Command: `npm run preview`

3. **Database Setup:**
   - Add MySQL service in Railway
   - Copy connection string to backend environment variables

4. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   DB_HOST=your-mysql-host
   DB_USER=your-mysql-user
   DB_PASSWORD=your-mysql-password
   DB_NAME=your-database-name
   JWT_SECRET=your-super-secret-jwt-key
   ```

### Option 3: DigitalOcean App Platform

1. **Prepare for DigitalOcean:**
   ```bash
   # Create app.yaml in root directory
   ```

2. **app.yaml configuration:**
   ```yaml
   name: store-rating-platform
   services:
   - name: backend
     source_dir: backend
     github:
       repo: your-username/your-repo
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NODE_ENV
       value: production
     - key: JWT_SECRET
       value: your-super-secret-jwt-key
     - key: DB_HOST
       value: your-mysql-host
     - key: DB_USER
       value: your-mysql-user
     - key: DB_PASSWORD
       value: your-mysql-password
     - key: DB_NAME
       value: your-database-name
   
   - name: frontend
     source_dir: frontend
     github:
       repo: your-username/your-repo
       branch: main
     build_command: npm run build
     run_command: npm run preview
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
   ```

### Option 4: Render (Recommended for Full-Stack)

#### Render Deployment (Full-Stack)

1. **Prepare for Render:**
   ```bash
   # Ensure your repository is on GitHub
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create Render Services:**
   - Go to [Render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"

3. **Backend Service Setup:**
   - **Connect Repository:** Select your GitHub repository
   - **Name:** `store-rating-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free tier (or paid for production)

4. **Backend Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   DB_HOST=your-mysql-host
   DB_USER=your-mysql-user
   DB_PASSWORD=your-mysql-password
   DB_NAME=platformDB
   JWT_SECRET=your-super-secret-jwt-key
   ```

5. **Database Setup (Render PostgreSQL):**
   - Click "New +" → "PostgreSQL"
   - **Name:** `store-rating-db`
   - **Database:** `platformDB`
   - **User:** Auto-generated
   - **Password:** Auto-generated
   - **Internal Database URL:** Copy this for environment variables

6. **Frontend Service Setup:**
   - Click "New +" → "Static Site"
   - **Connect Repository:** Same GitHub repository
   - **Name:** `store-rating-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

7. **Frontend Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-service.onrender.com/api
   ```

8. **Update Frontend API Configuration:**
   ```javascript
   // frontend/src/services/api.js
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
   ```

#### Render Deployment Steps:

1. **Deploy Backend:**
   ```bash
   # Render will automatically deploy when you push to GitHub
   git add .
   git commit -m "Deploy to Render"
   git push origin main
   ```

2. **Deploy Frontend:**
   - Frontend will auto-deploy after backend
   - Update API URL in frontend environment variables
   - Redeploy frontend

3. **Database Migration:**
   ```sql
   -- Connect to your Render PostgreSQL database
   -- Run the schema from README.md
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
   ```

#### Render-Specific Configuration:

1. **Backend package.json:**
   ```json
   {
     "scripts": {
       "start": "node app.js",
       "dev": "node app.js"
     },
     "engines": {
       "node": "18.x"
     }
   }
   ```

2. **Database Connection (PostgreSQL):**
   ```javascript
   // Update backend/config/db.js for PostgreSQL
   const { Pool } = require('pg');
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
   });
   ```

3. **CORS Configuration:**
   ```javascript
   // backend/app.js
   app.use(cors({
     origin: ['https://your-frontend-service.onrender.com'],
     credentials: true
   }));
   ```

### Option 5: AWS EC2 (Advanced)

1. **Launch EC2 Instance:**
   - Ubuntu 20.04 LTS
   - t2.micro (free tier)

2. **Install Dependencies:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MySQL
   sudo apt install mysql-server -y
   sudo mysql_secure_installation
   
   # Install PM2
   sudo npm install -g pm2
   ```

3. **Deploy Application:**
   ```bash
   # Clone repository
   git clone your-repo-url
   cd store-rating-platform
   
   # Install dependencies
   cd backend && npm install
   cd ../frontend && npm install && npm run build
   
   # Start with PM2
   cd ../backend
   pm2 start app.js --name "store-rating-backend"
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx:**
   ```bash
   sudo apt install nginx -y
   
   # Create nginx config
   sudo nano /etc/nginx/sites-available/store-rating
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🗄️ Database Setup

### MySQL Database Configuration

1. **Create Database:**
   ```sql
   CREATE DATABASE platformDB;
   USE platformDB;
   ```

2. **Run Schema:**
   ```sql
   -- Copy the schema from README.md
   CREATE TABLE `users` (
     `id` int NOT NULL AUTO_INCREMENT,
     `name` varchar(20) NOT NULL,
     `email` varchar(255) NOT NULL,
     `password` varchar(255) NOT NULL,
     `address` varchar(400) DEFAULT NULL,
     `role` enum('System Administrator','Normal User','Store Owner') NOT NULL DEFAULT 'Normal User',
     PRIMARY KEY (`id`),
     UNIQUE KEY `email` (`email`)
   );
   
   CREATE TABLE `stores` (
     `id` int NOT NULL AUTO_INCREMENT,
     `name` varchar(20) NOT NULL,
     `address` varchar(400) NOT NULL,
     `owner_id` int DEFAULT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `name` (`name`),
     KEY `owner_id` (`owner_id`),
     CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
   );
   
   CREATE TABLE `ratings` (
     `id` int NOT NULL AUTO_INCREMENT,
     `user_id` int NOT NULL,
     `store_id` int NOT NULL,
     `rating` int NOT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `user_store_unique` (`user_id`,`store_id`),
     KEY `store_id` (`store_id`),
     CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
     CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE,
     CONSTRAINT `rating_check` CHECK ((`rating` >= 1) AND (`rating` <= 5))
   );
   ```

3. **Create Admin User:**
   ```sql
   INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
   ('Admin User', 'admin@example.com', '$2a$10$your-bcrypt-hash-here', 'System Administrator');
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=3000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=platformDB
JWT_SECRET=your-super-secret-jwt-key-for-production
```

### Frontend Environment
Update `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:3000/api';
```

## 🔒 Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong JWT secrets
   - Use production database credentials

2. **CORS Configuration:**
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-domain.com'],
     credentials: true
   }));
   ```

3. **Database Security:**
   - Use strong passwords
   - Enable SSL connections
   - Regular backups

## 📊 Monitoring & Maintenance

1. **Health Checks:**
   ```javascript
   app.get('/health', (req, res) => {
     res.status(200).json({ status: 'OK', timestamp: new Date() });
   });
   ```

2. **Logging:**
   ```javascript
   const morgan = require('morgan');
   app.use(morgan('combined'));
   ```

3. **Error Monitoring:**
   - Consider Sentry for error tracking
   - Set up uptime monitoring

## 🚀 Quick Deploy Commands

### Render (Recommended - Full-Stack)
```bash
# Push to GitHub (Render auto-deploys)
git add .
git commit -m "Deploy to Render"
git push origin main

# Then configure in Render dashboard:
# 1. Create Web Service for backend
# 2. Create PostgreSQL database
# 3. Create Static Site for frontend
# 4. Set environment variables
```

### Heroku + Vercel (Alternative)
```bash
# Backend to Heroku
cd backend
heroku create your-app-backend
heroku addons:create cleardb:ignite
heroku config:set JWT_SECRET=your-secret
git push heroku main

# Frontend to Vercel
cd ../frontend
vercel --prod
```

### Railway (All-in-One)
```bash
# Connect GitHub repo to Railway
# Add MySQL service
# Set environment variables
# Deploy automatically
```

## 📝 Post-Deployment Checklist

- [ ] Database schema created
- [ ] Admin user created
- [ ] Environment variables set
- [ ] CORS configured
- [ ] SSL certificates installed
- [ ] Domain configured
- [ ] Monitoring set up
- [ ] Backup strategy implemented

## 🆘 Troubleshooting

### Common Issues:

1. **Database Connection Failed:**
   - Check environment variables
   - Verify database credentials
   - Ensure database is accessible

2. **CORS Errors:**
   - Update CORS origin in backend
   - Check frontend API URL

3. **Build Failures:**
   - Check Node.js version
   - Verify all dependencies
   - Check environment variables

### Support:
- Check application logs
- Verify environment variables
- Test database connectivity
- Check network connectivity

---

**Note:** Choose the deployment option that best fits your needs and technical expertise. Railway and Heroku are recommended for beginners, while AWS EC2 offers more control for advanced users.
