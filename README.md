# 🚀 Frontend - Meating Scheduler

A modern, responsive frontend application built using React.js/Vite/. This project serves as the user interface for the <b>Meating Schedular</b> platform, providing seamless user interaction and real-time experience.

## 🌟 Features

- 📱 Responsive UI with mobile-first design
- 🔐 Authentication & protected routes
- 🧾 Dynamic form validation
- 🔁 API integration with backend
- 💾 State management using Redux Toolkit 
- 🔐 Cookie-based or token-based authentication

---

## 🛠️ Tech Stack

- **Framework**: React.js / Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 
- **Form Handling**: React Hook Form 
- **Routing**: React Router DOM 

---

## 📦 Folder Structure

📦frontend
├── 📁public
├── 📁src
│ ├── 📁assets
│ ├── 📁app (store)
│ ├── 📁components
│ ├── 📁features (API calls)
│ ├── 📁pages
│ └── App.jsx / App.tsx
├── .env
└── package.json



---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/mohdumar-mern/meeting.git

# Navigate into the project directory
cd meeting

# Install dependencies
npm install

# Create a `.env` file
touch .env

# Start development server
npm run dev
````


🤝 Contributing
Feel free to open issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

🙌 Acknowledgements
React

Tailwind CSS

Redux Toolkit


---

Let me know your exact tech stack (React.js, Tailwind, Redux) and I’ll fully customize this for your project.


---
# 🔐 Backend - Meating Scheduler

This is the production-grade backend server for **Meating Schedular**, built with **Node.js**, **Express.js**, and **MongoDB**. It supports RESTful APIs, JWT authentication, advanced CRUD operations, and is ready for scalable deployment.

---

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose 
- **Authentication**: JWT + Cookies
- **Security**: Helmet, Rate Limiting, CORS,
- **Logging**: Morgan 

---

## 📁 Folder Structure

📦 backend
├── 📁 config # DB,
├── 📁 controllers # Route logic
├── 📁 middleware # Auth
├── 📁 models # DB schemas 
├── 📁 routes # All REST API endpoints
├── 📁 utils # Helpers, tokens
├── .env
├── server.js / app.js
└── package.json


---


---

## 🚀 Features

- 🔐 **JWT Authentication**
- 📄 **CRUD APIs** for all entities
- 🛡️ **Security Middlewares**: CORS, Helmet, Rate Limiting
- 🧾 **Proper logging** with  Morgan

---



## 🔧 Setup Instructions

```bash
# 1. Clone the project
git clone https://github.com/mohdumar-mern/meeting-api.git
cd meeting-api

# 2. Install dependencies
npm install

# 3. Create `.env` file
touch .env

# 4. Start dev server
npm run dev

````

## 🌐 Environment Variables (.env)

- PORT=5000
- NODE_ENV=development
- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=your_jwt_secret
- JWT_EXPIRES_IN=1h
- TWILIO_ACCOUNT_SID=your_account_sid
- TWILIO_AUTH_TOKEN=your_auth_token
- TWILIO_PHONE_NUMBER=your_phone_number
- SELF_URL=your_self_url
- FRONTEND_URL=your_frontend_url
---

📄 License
MIT © 2025 **Mohd Umar**

---

🤝 Contributing
PRs and issues are welcome. Please follow the conventional commit format and linting rules.



