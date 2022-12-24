const mongoose =require('mongoose');
const Option = require("../models/option")
const questionSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    // },
    // roll: {
    //     type: String,
    //     required: true,
    //     unique: true,    
    // },
    // registration: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // subjects: {
    //     type: [String],
    //     required: true,
    // },
    // registered_on: {
    //     type: Date,
    //     default: new Date(),
    // },
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