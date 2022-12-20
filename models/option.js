const mongoose =require('mongoose');

const optionSchema = mongoose.Schema({
    
        id: {
          type: Number,
        },
        // question: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Question",
        //   required: true,
        // },
        text: {
          type: String,
        },
        votes: {
          type: Number,
        },
        link: {
          type: String,
        },
      

})

var optiondata=mongoose.model('optiondata',optionSchema);
module.exports= optiondata;