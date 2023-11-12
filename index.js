const express= require('express');
const mongoose= require('mongoose');
const questionrouter= require("./routes/questions");
const optionrouter = require("./routes/options");
// const config =  require("./config/mongoose")
const cors = require('cors');
const http = require('http')
// const {Server} = require("socket.io")
const {chatModel} =require ("./models/chat")
const path = require('path')
const socketIO = require('socket.io');
const dotenv = require('dotenv')
dotenv.config();

const app=express();

const port = process.env.PORT || '9000';


// 1. Creating server using http.
const server = http.createServer(app);
const io = socketIO(server);


// 2. Create socket server.
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ["GET", "POST"]
//     }
// });

const url= "mongodb+srv://Ankuristic12:Adya1998@cluster0.0lufvph.mongodb.net/?retryWrites=true&w=majority";
console.log("url",url);
mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
app.use(cors());

// set up views setting
app.set('view engine', 'ejs');
// const anku=app.set("views",path.join(path.resolve(),'views'))
// app.use('/static/', express.static(path.join(__dirname + '/static')));
// app.use('public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("Error: "+error);
}


// 3. Use socket events.
io.on('connection', (socket) => {
    console.log("Connection is established");

      // Handle chat events (e.g., messages)
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use('/questions',questionrouter);
app.use('/options',optionrouter);

// template engine route

app.get("/",(req,res)=>{
    res.render("index")
})

// app.get("/vote",(req,res)=>{
//     res.render("vote")

// })

app.get("/result",(req,res)=>{
    res.render("result")
})


app.get("/notFound",(req,res)=>{
    res.render("not found")
})




server.listen(port, () =>{
    console.log('Server started'+  port);
})