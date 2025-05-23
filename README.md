# 🚀 TaskNova - Team Collaboration & Task Management Tool

A full-stack **MERN** (MongoDB, Express.js, React, Node.js) web application for task management & productivity enhancement.

---

## 📌 Overview

**TaskNova** is a cloud-based task management platform built to streamline team collaboration and task workflows. It empowers admins and users to manage tasks, assign responsibilities, and monitor progress through an intuitive and responsive interface. Designed with scalability, security, and usability in mind, TaskNova enhances how modern teams operate.

---

## ❓ Why TaskNova?

In fast-paced, collaborative environments, relying on spreadsheets or manual task tracking leads to inefficiencies and miscommunication. **TaskNova** solves this by offering:

- ✅ A centralized platform for task tracking and team communication.
- ✅ Real-time updates and status tracking.
- ✅ Role-based access to keep sensitive information secure.
- ✅ Seamless file and sub-task management.

---

## 🧠 Background

With the increasing prevalence of remote work, having a robust, easy-to-use task management system is more essential than ever. **TaskNova** leverages the **MERN stack**, **Redux Toolkit**, **Tailwind CSS**, and **Headless UI** to provide:

- ⚡ Fast, modern frontend experience.
- 📊 Real-time task filtering and visualization.
- 🔐 Secure user authentication and authorization.
- 🧩 Scalable backend architecture for large teams.

---

## 🛠️ Features

### 👑 Admin Features
- **Access Management**
  - role based access and management of tasks and users.
  - admin can perform crud operation on both tasks and users.
- **User Management**
  - Create, update, and delete users.
  - Promote users to admin or restrict access.
- **Task Assignment**
  - Assign tasks to individuals or multiple users.
  - Modify task details (title, description, deadlines).
- **Task Properties**
  - Set task labels: `To-do`, `In-Progress`, `Completed`.
  - Prioritize tasks (High, Medium, Low).
  - Add nested sub-tasks.
- **Asset Management**
  - Upload files (PDFs, images, docs) with tasks.
- **User Account Control**
  - Activate/disable accounts.
  - Soft-delete or permanently remove tasks.

### 🙋 User Features

- **Task Interaction**
  - Change task status.
  - View and sort assigned tasks.
- **Communication**
  - Comment under tasks for collaborative discussions.

### 🌐 General Features

- **Authentication & Authorization**
  - Secure login.
  - JWT-based protected routes.
- **Profile Management**
  - Update personal information.
  - Change passwords.
- **Dashboard**
  - Visual overview of task statuses.
  - Filters for task status, priority, and assignees.

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- **React (Vite)**
- **Redux Toolkit** – State management
- **Tailwind CSS** – Utility-first styling
- **Headless UI** – Accessible UI components

### 🌐 Backend

- **Node.js + Express.js**
- **JWT & Bcrypt.js** – Secure authentication
- **Multer** – File uploads
- **Mongoose** – MongoDB object modeling

### 🗄️ Database

- **MongoDB Atlas** – Cloud NoSQL database

---

## 📊 Folder Structure
```
📁TaskNova-Full-Stack-Project-using-MERN
└── 📁client
    └── 📁public
    └── 📁src
        └── 📁assets
            └── 📁fonts
        └── 📁components
            └── 📁tasks
        └── 📁pages
        └── 📁redux
            └── 📁slices
                └── 📁api
        └── 📁utils
└── 📁server
    └── 📁controllers
    └── 📁middleware
    └── 📁models
    └── 📁routes
    └── 📁utils

```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ravikumar9519/TaskNova.git
cd TaskNova
```

### 2. Setup Server

```bash
cd server
npm install
npm start
```

### 3. Setup Client

```bash
cd client
npm install
npm run dev
```

---
### 4. Setup `.env` Files

Create the following `.env` files in both the `client` and `server` directories:

#### 📁 `client/.env`

```env
VITE_APP_BASE_URL=http://localhost:5000
VITE_APP_FIREBASE_API_KEY=your_firebase_api_key
```

#### 📁 `server/.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Make sure **not to include spaces around the `=` signs**, and replace the placeholders with your actual configuration values.

---

## 🧪 Testing

- Manual UI/UX testing done using browser dev tools.
- Backend tested using Postman & integration tests.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## ✨ Future Enhancements

- Real-time notifications with WebSockets.
- Gantt chart or calendar view for task timelines.
- Email alerts and reminders.
- Activity logs and audit trails.

---

## 📬 Contact

Have questions or suggestions? Feel free to reach out:

- 👨‍💻 Author: [Ravi Bharti](https://www.linkedin.com/in/ravi-bharti-386849254/)
- 📧 Email: ravikumarbharti951946@gmail.com

---
