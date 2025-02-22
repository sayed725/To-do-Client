# Task Management Application

## 🚀 Live Demo
[Click here to view the live application](#)

## 📌 Description
A Task Management Application where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. The app ensures real-time data synchronization with MongoDB and provides a seamless user experience with Firebase authentication.

## 🛠 Features
- **User Authentication**: Firebase Google Sign-In.
- **Task Management**:
  - Add, edit, delete tasks.
  - Drag-and-drop tasks between categories.
  - Reorder tasks within the same category.
- **Task Categories**:
  - To-Do
  - In Progress
  - Done
- **Real-Time Synchronization**:
  - Instant updates in the database.
  - Tasks persist on refresh.
- **Modern UI**: Built with Vite.js, React, and Tailwind CSS.
- **Mobile Responsive**: Works on both desktop and mobile.
- **Bonus Features** (if implemented):
  - Dark mode toggle.
  - Task due dates with color indicators.
  - Activity log to track task changes.

## 🏗 Tech Stack
### **Frontend**
- Vite.js + React
- React Beautiful DnD (or alternative)
- Tailwind CSS
- Firebase Authentication

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- WebSockets (or alternative real-time syncing solution)

## 📂 Folder Structure
```
📦 task-manager-app
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 components
│   │   ├── 📁 pages
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
├── 📁 backend
│   ├── 📁 models
│   ├── 📁 routes
│   ├── server.js
│   ├── package.json
│
├── README.md
```

## 🔧 Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
```

### **2. Setup Backend**
```sh
cd backend
npm install
```
- Create a `.env` file and add your MongoDB connection string and Firebase credentials.
- Start the backend server:
```sh
npm run dev
```

### **3. Setup Frontend**
```sh
cd frontend
npm install
```
- Create a `.env` file and add your Firebase API keys.
- Start the frontend application:
```sh
npm run dev
```

## 📌 API Endpoints
| Method | Endpoint         | Description                     |
|--------|-----------------|---------------------------------|
| POST   | `/tasks`        | Add a new task                 |
| GET    | `/tasks`        | Retrieve all user tasks        |
| PUT    | `/tasks/:id`    | Update task details            |
| DELETE | `/tasks/:id`    | Delete a task                  |

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit pull requests.

## 📧 Contact
For any inquiries, reach out at [your email].

