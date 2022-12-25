const mongoose =require('mongoose');
const Option = require("../models/option")
const questionSchema = mongoose.Schema({
   
    title:{
        type: String,
    },

     option:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",

     }
    ]

   //   vote:{
   //      type:boolean

   //   }

})

var questiondata=mongoose.model('questiondata',questionSchema);
module.exports= questiondata;