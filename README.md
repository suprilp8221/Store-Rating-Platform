# StoreRating Pro - Professional Store Rating Platform

A modern, full-stack web application that provides a comprehensive platform for store discovery, rating, and management. Built with professional UI/UX design, it features distinct roles for normal users, store owners, and system administrators, offering an enterprise-grade solution for store rating and review management.

This project is built with a Node.js/Express backend, a React frontend with Material-UI, and a MySQL database.

## 🎨 Professional Design Features

- **Modern Glassmorphism UI**: Beautiful backdrop blur effects and transparency
- **Professional Color Scheme**: Modern indigo and pink gradients throughout
- **Responsive Design**: Mobile-first approach with perfect scaling
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Professional Typography**: Inter font family with optimized weights
- **Enterprise-Grade Styling**: Professional shadows, spacing, and visual hierarchy

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Default Credentials](#default-credentials)
- [API Endpoints](#api-endpoints)

## ✨ Features

### 🔐 **Authentication & User Management**
- **Professional Signup/Login**: Modern glassmorphism forms with role selection
- **Role-Based Access Control:**
  - **System Administrator:** Full control over users and stores with comprehensive analytics
  - **Store Owner:** Advanced dashboard with store analytics and performance metrics
  - **Normal User:** Intuitive store discovery and rating experience
- **Smart Redirection**: Automatic role-based navigation after authentication
- **Secure Authentication**: JWT-based authentication with password hashing

### 🏪 **Store Management**
- **Professional Store Directory**: Beautiful card-based layout with search and filtering
- **Advanced Analytics**: Real-time statistics and performance metrics
- **Store Assignment**: Admins can assign stores to Store Owners
- **Rating System**: 1-5 star rating system with average calculations
- **Professional UI**: Modern cards with hover effects and smooth animations

### 📊 **Dashboard & Analytics**
- **Role-Specific Dashboards**: Tailored experiences for each user type
- **Real-Time Statistics**: Live data updates and performance metrics
- **Professional Data Tables**: Sortable, filterable tables with modern styling
- **Visual Analytics**: Charts and graphs for data visualization

### 🎨 **User Experience**
- **Modern Navigation**: Professional sidebar and navbar with glassmorphism effects
- **Responsive Design**: Perfect experience across all devices
- **Loading States**: Professional loading spinners and feedback
- **Error Handling**: Comprehensive error messages and user feedback
- **Accessibility**: ARIA labels and semantic HTML structure

## 🛠️ Tech Stack

### **Backend:**
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web framework
- [MySQL2](https://github.com/sidorares/node-mysql2) - Database connection
- [JSON Web Tokens (JWT)](https://jwt.io/) - Authentication
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [CORS](https://github.com/expressjs/cors) - Cross-origin resource sharing

### **Frontend:**
- [React](https://reactjs.org/) - UI library
- [Material-UI (MUI)](https://mui.com/) - Professional component library
- [Axios](https://axios-http.com/) - HTTP client
- [React Router](https://reactrouter.com/) - Client-side routing
- [Inter Font](https://fonts.google.com/specimen/Inter) - Professional typography

### **Database:**
- [MySQL](https://www.mysql.com/) - Relational database

### **Development Tools:**
- [Vite](https://vitejs.dev/) - Fast build tool
- [ESLint](https://eslint.org/) - Code linting
- [Git](https://git-scm.com/) - Version control

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/download/) (v16.x or later recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)

## Installation & Setup


1.  **Clone or download this repository:**
    ```bash
    git clone <your-repo-url>
    cd store-rating-platform
    ```

### Database Setup

1.  **Log in to your MySQL server:**
    ```bash
    mysql -u root -p
    ```

2.  **Create the database:**
    ```sql
    CREATE DATABASE platformDB;
    ```

3.  **Create the tables.** Use the following SQL schema to create the necessary tables in the `platformDB` database.

    ```sql
    USE platformDB;

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

4.  **(Optional) Seed the database with a default admin user:**
    ```sql
    INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
    ('Default Admin User', 'admin@example.com', 'YOUR_BCRYPT_HASH_HERE', 'System Administrator');
    ```
    > **Note on Password Hashing:** You need to generate a bcrypt hash for a password of your choice. You can use a simple Node.js script for this. In the `backend` directory, create a file `hash.js` with the following content:
    > ```javascript
    > const bcrypt = require('bcryptjs');
    > const password = 'Admin@123';
    > const salt = bcrypt.genSaltSync(10);
    > const hash = bcrypt.hashSync(password, salt);
    > console.log(hash);
    > ```
    > Run `npm install bcryptjs` and then `node hash.js`. Copy the output hash into the SQL statement.

### Backend Setup

1.  Navigate to the backend directory: `cd backend`
2.  Install dependencies: `npm install express mysql2 bcryptjs jsonwebtoken dotenv cors body-parser`
3.  Create and configure the environment file by copying the contents from the `.env` file provided in the context and updating the values with your local configuration.

### Frontend Setup

1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  The frontend uses Vite for fast development and building

## Environment Variables

The backend requires a `.env` file in the `backend/` directory with the following variables:

```properties
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=platformDB

# JWT Configuration
JWT_SECRET=a_very_strong_and_secret_key_for_jwt
```

## 🚀 Running the Application

You need to run the backend and frontend servers in separate terminal windows.

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm start
    ```
    The server will start on `http://localhost:3000` (or the port specified in your `.env`).

2.  **Start the Frontend Development Server:**
    ```bash
    cd frontend
    npm run dev
    ```
    The React application will open in your browser, typically at `http://localhost:5173` (Vite default port).

## 🎯 Key Improvements

### **Professional UI/UX**
- ✅ Modern glassmorphism design with backdrop blur effects
- ✅ Professional color scheme with indigo and pink gradients
- ✅ Responsive design that works perfectly on all devices
- ✅ Smooth animations and hover effects throughout
- ✅ Professional typography using Inter font family

### **Enhanced Authentication**
- ✅ Professional signup form with role selection
- ✅ Smart redirection based on user role after authentication
- ✅ Updated validation (8-20 characters for names)
- ✅ Enhanced error handling and user feedback

### **Modern Development Experience**
- ✅ Vite for fast development and building
- ✅ Material-UI for professional components
- ✅ ESLint for code quality
- ✅ Professional project structure


## 📡 API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint                               | Role(s) Required       | Description                                                              |
|--------|----------------------------------------|------------------------|--------------------------------------------------------------------------|
| `POST` | `/auth/signup`                         | Public                 | Register a new user with role selection.                                 |
| `POST` | `/auth/login`                          | Public                 | Log in and receive a JWT.                                                |
| `POST` | `/auth/logout`                         | Authenticated          | Log out and invalidate token.                                            |
| `PUT`  | `/auth/password`                       | Authenticated          | Update user password.                                                    |
| `GET`  | `/stores`                              | Public                 | Get a list of all stores with search and sort options.                   |
| `POST` | `/stores/:storeId/rate`                | Normal User            | Submit or update a rating for a specific store.                          |
| `GET`  | `/store-owner/dashboard`               | Store Owner            | Get dashboard data, including owned stores and overall average rating.   |
| `GET`  | `/admin/dashboard`                     | System Administrator   | Get system-wide metrics (total users, stores, ratings).                  |
| `GET`  | `/admin/users`                         | System Administrator   | Get a list of all users with filtering and sorting.                      |
| `POST` | `/admin/users`                         | System Administrator   | Create a new user.                                                       |
| `PUT`  | `/admin/users/:id`                     | System Administrator   | Update an existing user's details.                                       |
| `DELETE`| `/admin/users/:id`                    | System Administrator   | Delete a user.                                                           |
| `GET`  | `/admin/stores`                        | System Administrator   | Get a list of all stores with filtering and sorting.                     |
| `POST` | `/admin/stores`                        | System Administrator   | Create a new store.                                                      |
| `PUT`  | `/admin/stores/:id`                    | System Administrator   | Update a store's details, including assigning an owner.                  |
| `DELETE`| `/admin/stores/:id`                   | System Administrator   | Delete a store.                                                          |

## 🎨 Design System

### **Color Palette**
- **Primary**: Indigo (#6366f1) with purple gradient (#8b5cf6)
- **Secondary**: Pink (#ec4899) with light pink gradient (#f472b6)
- **Success**: Green (#10b981) with emerald gradient (#34d399)
- **Warning**: Amber (#f59e0b) with yellow gradient (#fbbf24)
- **Error**: Red (#ef4444) with light red gradient (#f87171)

### **Typography**
- **Font Family**: Inter (300-900 weights)
- **Headings**: 800 weight with optimized line heights
- **Body Text**: 400 weight with 1.6 line height
- **Buttons**: 600 weight with letter spacing

### **Components**
- **Border Radius**: 12px for cards, 8px for buttons
- **Shadows**: 25-level shadow system for depth
- **Spacing**: 8px base unit with consistent spacing scale
- **Animations**: 0.2s ease-in-out transitions

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px)
- **Navigation**: Collapsible sidebar on mobile
- **Cards**: Responsive grid layout
- **Typography**: Fluid typography that scales with screen size

