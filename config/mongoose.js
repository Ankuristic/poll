// const mongoose = require('mongoose');






const mongoose = require("mongoose")

const mongoURI= "mongodb+srv://Ankuristic12:Adya1998@cluster0.0lufvph.mongodb.net/?retryWrites=true&w=majority"
const connectionParams ={
    useNewUrlParser:true,
    useUnifiedTopology:true
}
console.log("hello",connectionParams)
mongoose .connect(mongoURI ,connectionParams) .then(() => console.log("MongoDB connected")) .catch((e) => {console.log(e)});




