# ⚡ NexaChain — Frontend Application

NexaChain Frontend is a modern, secure, and responsive React.js application for the NexaChain Investment & Multi-Level Referral Platform. It provides users with a seamless experience for authentication, investment management, wallet tracking, referral monitoring, ROI analytics, and transaction history while communicating with the backend through secure REST APIs.

---

# 📖 Table of Contents

- Overview
- Project Objectives
- Features
- Technology Stack
- System Architecture
- Project Structure
- Environment Configuration
- Installation
- Available Scripts
- API Integration
- Authentication Flow
- Application Workflow
- Security Features
- Future Enhancements
- License

---

# 🚀 Overview

NexaChain is a full-stack investment platform where users can:

- Register using a referral code
- Purchase investment plans
- Earn daily ROI
- Build a multi-level referral network
- Track wallet balance
- Monitor earnings
- View transaction history
- Manage their profile securely

The frontend is built using **React.js** and communicates with the Express.js backend through JWT-protected REST APIs.

---

# 🎯 Project Objectives

- Provide a fast and responsive investment dashboard.
- Display real-time wallet balances and investment statistics.
- Allow users to purchase investment plans.
- Visualize multi-level referral hierarchy.
- Maintain a transparent transaction ledger.
- Ensure secure authentication using JWT.
- Deliver a clean and modern user experience.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Auto Login Persistence
- Logout Functionality

---

## 💰 Investment Module

- View Available Plans
- Purchase Investment Plans
- Active Investments List
- Investment Status
- Investment History

---

## 💳 Wallet Module

- Wallet Balance
- Total Investment
- Total ROI Earned
- Referral Income
- Wallet Summary

---

## 👥 Referral Module

- Referral Code
- Referral Link
- Direct Referrals
- Multi-Level Team
- Referral Income
- Team Statistics

---

## 📈 Dashboard

Displays live statistics including:

- Wallet Balance
- Active Investment
- Total ROI
- Referral Income
- Team Size
- Recent Transactions

---

## 📑 Transactions

- ROI History
- Referral Commission
- Investment History
- Wallet Transactions
- Complete Audit Ledger

---

## 🎨 User Experience

- Responsive Design
- Mobile Friendly
- Dashboard Layout
- Sidebar Navigation
- Modern UI Components
- Loading States
- Error Handling

---

# 🛠 Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React
- Context API

---

## Development Tools

- Node.js
- npm
- PostCSS
- Autoprefixer
- ESLint

---

# 🏗 High-Level System Architecture

```text
                     +-------------------------+
                     |     React Frontend      |
                     |-------------------------|
                     | Login / Dashboard       |
                     | Wallet                 |
                     | Investments            |
                     | Referral Tree          |
                     | Transactions           |
                     +-----------+------------+
                                 |
                                 |
                          HTTPS / REST API
                          Authorization JWT
                                 |
                                 ▼
+---------------------------------------------------------------+
|                    Express.js Backend API                     |
|---------------------------------------------------------------|
| Authentication Controller                                     |
| Dashboard Controller                                          |
| Investment Controller                                         |
| Wallet Controller                                             |
| Referral Controller                                           |
| Transaction Controller                                        |
| ROI Engine                                                    |
+--------------------------+------------------------------------+
                           |
                           |
                        Mongoose
                           |
                           ▼
+---------------------------------------------------------------+
|                        MongoDB Database                       |
|---------------------------------------------------------------|
| Users Collection                                              |
| Investments Collection                                        |
| Transactions Collection                                       |
| ROI Collection                                                |
| Referral Collection                                           |
+---------------------------------------------------------------+
```

---

# 💡 Technology Decisions

## React.js

- Component-based architecture
- Fast rendering
- SPA support
- Reusable UI components

---

## Axios

- Centralized API client
- Automatic JWT injection
- Request interceptors
- Response interceptors
- Error handling

---

## React Router DOM

- Client-side routing
- Protected Routes
- Navigation Guards
- Nested Routing

---

## Tailwind CSS

- Utility-first CSS
- Responsive Design
- Faster Development
- Minimal CSS Files

---

## Context API

- Authentication State
- User Information
- Global State Management

---

# 📂 Project Directory Structure

```text
nexachain-frontend/
│
├── public/
│   └── index.html
│
├── src/
│
│   ├── api/
│   │   └── axiosInstance.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── ProtectedRoute.js
│   │   └── Loader.js
│   │
│   ├── context/
│   │   └── AuthContext.js
│   │
│   ├── hooks/
│   │
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Investments.js
│   │   ├── Referrals.js
│   │   ├── Transactions.js
│   │   └── Profile.js
│   │
│   ├── utils/
│   │
│   ├── App.js
│   ├── index.js
│   └── index.css
│
├── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

# ⚙ Environment Configuration

Create a `.env` file in the project root.

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

---

# 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd nexachain-frontend
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

---

# 📜 Available Scripts

Start Development Server

```bash
npm start
```

Build Production Version

```bash
npm run build
```

Run Tests

```bash
npm test
```

---

# 🔗 API Integration

| Module | Method | Endpoint | Description |
|----------|---------|----------|-------------|
| Authentication | POST | /api/auth/login | User Login |
| Authentication | POST | /api/auth/register | User Registration |
| Dashboard | GET | /api/dashboard/overview | Dashboard Summary |
| Investments | GET | /api/investments | Investment List |
| Investments | POST | /api/investments | Purchase Investment |
| Referrals | GET | /api/referrals/tree | Referral Tree |
| Referrals | GET | /api/referrals/direct | Direct Referrals |
| Transactions | GET | /api/dashboard/transactions | Transaction History |
| Profile | GET | /api/profile | User Profile |

---

# 🔐 Authentication Flow

```text
User Login
      │
      ▼
Backend Authentication
      │
      ▼
JWT Token Generated
      │
      ▼
Stored in Local Storage
      │
      ▼
Axios Interceptor
      │
      ▼
Authorization: Bearer <JWT_TOKEN>
      │
      ▼
Protected API Access
```

---

# 🔄 Application Workflow

```text
User
 │
 ▼
Login
 │
 ▼
JWT Authentication
 │
 ▼
Dashboard
 │
 ├────────► Wallet
 │
 ├────────► Investments
 │
 ├────────► Referral Network
 │
 ├────────► Transactions
 │
 └────────► Profile
```

---

# 🔒 Security Features

- JWT Authentication
- Protected Routes
- Token-based Authorization
- Secure API Communication
- Centralized Axios Interceptors
- Automatic Unauthorized Redirect
- Client-side Route Protection
- Secure Session Persistence

---

# 📱 Responsive Design

The frontend is fully responsive and optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 🚀 Performance Optimizations

- Lazy Loading Components
- Reusable Components
- Optimized API Calls
- Minimal Re-renders
- Efficient State Management
- Responsive Layout

---

# 🔮 Future Enhancements

- Dark / Light Theme
- Push Notifications
- Real-time WebSocket Updates
- Live ROI Tracking
- Multi-language Support
- Admin Dashboard
- KYC Verification
- Payment Gateway Integration
- Withdrawal Requests
- Two-Factor Authentication (2FA)
- PWA Support

---

# 🤝 Backend Integration

The frontend is designed to work seamlessly with the **NexaChain Express.js Backend**, which provides:

- Authentication APIs
- Investment Management
- Wallet Management
- ROI Distribution
- Referral System
- Transaction Ledger
- User Profile Management

---

# 📄 License

This project is developed for the **NexaChain Investment Platform**.

Copyright © 2026 NexaChain.

All Rights Reserved.