const { Server } = require('socket.io');

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', socket => {
    console.log(`🟢 User connected: ${socket.id}`);

    socket.on('join-room', ({ roomId, user }) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-joined', { id: socket.id, user });
      console.log(`🧑‍🤝‍🧑 ${user.name} joined room ${roomId}`);
    });

    socket.on('signal', ({ to, data }) => {
      io.to(to).emit('signal', { from: socket.id, data });
    });

    socket.on('sync', ({ roomId, action }) => {
      socket.to(roomId).emit('sync', { from: socket.id, action });
    });

    socket.on('chat', ({ roomId, message }) => {
      socket.to(roomId).emit('chat', { from: socket.id, message });
    });

    socket.on('disconnect', () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
      socket.broadcast.emit('user-disconnected', socket.id);
    });
  });
}

module.exports = initSocket;
