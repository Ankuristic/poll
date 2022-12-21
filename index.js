const express= require('express');
const mongoose= require('mongoose');
const questionrouter= require("./routes/questions");
const optionrouter = require("./routes/options");


const app=express();

const port=9000;
const url= "mongodb://localhost:27017/polling-api";
console.log("url",url);

mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
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



app.listen(port, () =>{
    console.log('Server started'+  port);
})