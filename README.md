# MeetSphere 🎥💬

MeetSphere is a full-featured video conferencing web application built using the MERN stack (MongoDB, Express, React, Node.js) with WebRTC and Socket.io. It enables users to securely create or join meetings, interact via video/audio, and chat in real-time.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 🧑‍🤝‍🧑 Start or Join meetings via unique Meeting ID
- 📹 Real-time Video and Audio conferencing (WebRTC)
- 💬 Integrated Chat System (Socket.io)
- 🕒 Session Timer with 24-hour limit
- 🖥️ Screen sharing without mirror effect
- 👥 Participant tiles similar to Google Meet
- ☁️ Hosted on AWS EC2

---

## 📁 Project Structure


```bash
├── backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── VideoCall.jsx
│   │   │   └── Dashboard.jsx
│   │   └── App.jsx
│   └── package.json


---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- WebRTC

---

## 🔐 Authentication

- Users can register and log in securely.
- Authenticated users can:
  - Start a new meeting (generates a unique UUID)
  - Join a meeting using an existing Meeting ID

---

## 📡 WebRTC & Socket.io

- Real-time peer-to-peer media connections
- Uses Socket.io signaling server for WebRTC handshake
- Handles multiple users, screen sharing, and disconnections

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/meetsphere.git
cd meetsphere

### 2. Install dependencies
#### Backend:
```bash
cd backend
npm install
#### Frontend:
```bash
cd frontend
npm install

## 🔗 Routes
Backend Routes
Method	Endpoint	Description
POST	/api/signup	User signup
POST	/api/login	User login
POST	/api/start-meeting	Create and return a Meeting ID
POST	/api/join-meeting	Join a meeting with Meeting ID

## 📌 Future Enhancements
Recording meetings
Calendar integrations
Meeting history for users
Admin controls in meetings

### 👩‍💻 Author
Sneha Rani

###📄 License
This project is licensed under the MIT License.