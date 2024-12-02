const createError = require("http-errors");

module.exports = (io) => {
    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        console.log('headers:', socket.handshake.auth)
        if (!username) {
            return next(createError('invalid_username'));
        }
        socket.username = username;
        next();
    });

    io.on('connection', (socket) => {
        console.log('connected', socket.id);
        // fetch existing users
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username
            })
        }

        console.log('return connected users', users);
        // send all registered users back to the client
        socket.emit("users", users);

        // notify existing users
        socket.broadcast.emit("user_connected", {
            userID: socket.id,
            username: socket.username,
        });

        // forward the private message to the right recipient
        socket.on("private_message", ({content, to}) => {
            console.log({content, to});
            socket.to(to).emit("private_message", {
                content,
                from: socket.id
            });
        });

        // notify users upon disconnection
        socket.on("disconnect", () => {
            console.log("disconnected", socket.id);
            socket.broadcast.emit("user_disconnected", socket.id);
        });
    });
}
