# 🎬 Cinemates

**Cinemates** is a full-stack movie streaming and watch party app designed for discovering, viewing, and (in future update) sharing cinematic experiences with others locally.

Built with real-time functionality, user accounts, and interactive UI, Cinemates is the perfect foundation for collaborative movie sessions.

---

## 🚀 Features

* 🔍 **Movie Search** using TMDb API
* 📽️ **Stream movies** via VidLink embed
* 👤 **User Authentication** (Register/Login with JWT)
* 📺  `on development`**Watch Party Rooms** with real-time sync via Socket.IO
* 🕒  `on development`**Watch History & Watchlist** (local storage)
* 🎭  `on development`**Default Avatars** and Username display
* 💬  `on development`Chat, video calls, and reactions

---

## 🧱 Tech Stack

### Frontend:

* React (Vite)
* TailwindCSS
* React Router DOM
* Context API (Auth)

### Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO

---

## 🛠️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ghostcar5153/cinemates.git
cd cinemates
```

### 2. Environment Variables

Inside the `server/` folder, create a `.env` file:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key
```

To obtain them:

* `MONGO_URI`: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
* `JWT_SECRET`: Generate a secure string manually or with an online tool like [RandomKeygen](https://randomkeygen.com/).

**⚠️ Never share this file publicly. It's ignored in `.gitignore`.**

---

### 3. Install dependencies

#### Server:

```bash
cd server
npm install
```

#### Client:

```bash
cd ../client
npm install
```

---

### 4. Run the app locally

#### Start the backend (port 5000):

```bash
cd server
npm run dev
```

#### Start the frontend (port 5173 by default):

```bash
cd ../client
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Login Info

To access the dashboard, you must:

1. Register for an account at `/register`
2. Then log in at `/login`

---

## 📌 Coming Soon

* ✅ User profiles with avatars
* ✅ Modal dropdown in navbar
* 🔄 Real-time video sync across party room clients
* 💬 In-room chat
* 📹 WebRTC-based video/audio party support
* 🌐 Deployments & environment-aware configs
* ✨ Better UI/UX

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributions

For now, this is a personal project. Contributions are welcome though.

---

Made with 🍿 and Tailwind 💜
