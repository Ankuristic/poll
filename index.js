const express= require('express');
const mongoose= require('mongoose');
const questionrouter= require("./routes/questions");
const optionrouter = require("./routes/options");
// const config =  require("./config/mongoose")
const cors = require('cors');
// import { Server } from 'socket.io';
// import { chatModel } from './models/chat';




const app=express();

// 1. Creating server using http.
const server = http.createServer(app);

// 2. Create socket server.
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

const port=9000;
const url= "mongodb+srv://Ankuristic12:Adya1998@cluster0.0lufvph.mongodb.net/?retryWrites=true&w=majority";
console.log("url",url);



mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
app.use(cors());
app.set('view engine', 'ejs');
app.use('/static/', express.static(path.join(__dirname + '/static')));
app.use('public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}

app.use('/questions',questionrouter);
app.use('/options',optionrouter);



// 3. Use socket events.

io.on('connection', (socket) => {
    console.log("Connection is established");

    socket.on("join", (data) => {
        socket.username = data;
        // send old messages to the clients.
        chatModel.find().sort({ timestamp: 1 }).limit(50)
            .then(messages => {
                socket.emit('load_messages', messages);
            }).catch(err => {
                console.log(err);
            })
    });

    socket.on('new_message', (message) => {
        let userMessage = {
            username: socket.username,
            message: message
        }

        const newChat = new chatModel({
            username: socket.username,
            message: message,
            timestamp: new Date()
        });
        newChat.save();

        // broadcast this message to all the clients.
        socket.broadcast.emit('broadcast_message', userMessage);
    })

    socket.on('disconnect', () => {
        console.log("Connection is disconnected");
    })
});

app.listen(port, () =>{
    console.log('Server started'+  port);
})