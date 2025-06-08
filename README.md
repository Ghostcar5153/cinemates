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

## ⚖️ Environment Variables Setup

To run **Cinemates** locally, you need two `.env` files — one for the backend and one for the frontend — each containing key secrets.

---

### 🔑 **Server-side (.env in `server/` folder)**

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_key
```

* **`MONGO_URI`**:

  1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create a free “Shared” cluster.
  2. Define a database user and whitelist your IP.
  3. In Cluster > Connect > “Connect your application”, copy the provided URI (e.g. `mongodb+srv://user:pass@cluster0.abcd.mongodb.net/myDB?retryWrites=true&w=majority`).

* **`JWT_SECRET`**:
  Create a strong, random secret string. Tools like [RandomKeygen](https://randomkeygen.com/) generate high-entropy keys easily.

---

### 🧰 **Client-side (.env in `client/` folder)**

```env
VITE_TMDB_KEY=your_tmdb_api_key
```

1. Create an account at [TMDb](https://www.themoviedb.org/).
2. In Account > Settings > API, request a “Developer” key.
3. Once approved, copy the API key and paste it into your `.env`.

---

### ⚠️ **Important Security Notes**

* Both `.env` files are added to `.gitignore` — **do not commit them** into version control.
* Your server `.env` contains sensitive information; keep it private.
* For frontend use, exposing the TMDb key is acceptable under TMDb’s terms, but still, **protect the server key**.

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
