const app = require('express')();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./routes/LoginRoutes');
const registerRouter = require('./routes/RegisterRoutes');
const Msg = require('./models/Message');

app.use(cors());

const http = require('http').createServer(app);

// creating server side socket
const io = require('socket.io')(http);

app.use(express.urlencoded({ extended: false }));

app.use(loginRouter);
app.use(registerRouter);

const connectionString = 'mongodb+srv://kunga_lhosel:2641678@cluster0.ikvyl.mongodb.net/User?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Successful Connection');
}).catch(err => {
    console.log('Error Connection');
});

app.use('/styles', express.static('styles'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
})

app.get('/join', (req, res) => {
    res.sendFile(__dirname + '/join.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

function output(username, text) {
    var today = new Date();

    var time = `${today.getHours()}:${today.getMinutes()}`;
    return {
        username,
        text,
        sentat: time
    }
}

// client connection
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);

        // welcoming
        socket.emit('message', output('Chat App Bot', 'beep-boop - Welcome to Chat App!'));

        // broadcasting when user connects
        socket.broadcast.to(room).emit('message', output('Chat App Bot', `${username} has joined the chat`));

        // catching messages sent
        socket.on('addMessage', (message) => {
            var from_user = username;

            var msg_sent = message;

            io.to(room).emit('message', output(username, message));

            const message_sent = new Msg({
                "from_user": from_user,
                "room": room,
                "message": msg_sent,
                "date_sent": new Date()
            });

            message_sent.save();
        });

        // client disconnects
        socket.on('disconnect', () => {
            io.to(room).emit('message', output('Chat App Bot', `${username} has disconnected`));
        });
    });
});

http.listen(8080, () => { console.log('Server is running on http://localhost:8080') });