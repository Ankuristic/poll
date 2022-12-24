const mongoose =require('mongoose');
const Question = require("../models/question")

const optionSchema = mongoose.Schema({
    
        // id: {
        //   type: String,
        // },
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
         
        },
        text: {
          type: String,
          

        },
        votes: {
          type: Number,
          default:0,
        },
        link: {
          type: String,
          default:"",
        },
      

})

var optiondata=mongoose.model('optiondata',optionSchema);
module.exports= optiondata;