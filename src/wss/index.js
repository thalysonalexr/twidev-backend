const connectedUsers = {};
const maxConnections = 100;

/* helper to get a size of object */
Object.size = (obj) => {
  let size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

module.exports = (Server) => {
  
  const io = require("socket.io")(Server);

  setInterval(() => {
    io.emit("concurrent-connections", Object.size(connectedUsers));
  }, 5000);

  io.on("connection", (socket) => {

    // verifica se atingiu o maximo de conexoes
    if (io.engine.clientsCount > maxConnections) {
      console.log(`Close connection to client id(${socket.id})`);
      io.emit("show-max-connections");
      socket.conn.close();
    }
  
    const { user } = socket.handshake.query;
  
    connectedUsers[user] = socket.id;

    socket.broadcast.emit("bootstrap", connectedUsers);

    socket.on("disconnect", () => {
      delete connectedUsers[user];
      
      console.log(`The user(${user}) with id(${socket.id}) is disconnected.`);
      socket.broadcast.emit("bootstrap", connectedUsers);
      socket.broadcast.emit("user-disconnected", socket.id);
    });
  });

  return io;
}
