const express= require('express');
const mongoose= require('mongoose');

const Questions= require('../models/question');
const Option= require('../models/option');


const createQuestion =  async (req, res) => {
    console.log(req.body.title);
    const questions = new Questions({
        // name:req.body.name,
        // roll:req.body.roll,
        // registration:req.body.registration,
        // subjects:req.body.subjects,
        // created_on:req.body.created_on
        title:req.body.title,
        option:req.body.option,


    })
    try {
     const ankur=   await questions.save();
     console.log("ankur",ankur);

        res.status(201).json(questions);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

}




  
  //To delete a question
const deleteQuestion = async function(req, res){

    try{

        let id = req.params.id;
        let question = await Questions.findById(id).populate({
            path : 'option',
            select : 'votes',
        });

        if(question){
            // checking if any option has some votes already
            let options = question.options;

            for(let i = 0; i < options.length; i++){
                if(options[i].votes > 0){
                    return res.status(404).json({
                        data : {
                            message : "Question can not be deleted, it's options are voted already !",
                        }
                    });
                }
            }

           
            await Option.deleteMany({ question:id });
            await Questions.findByIdAndDelete(id);

            return res.status(200).json({
                message : "Question deleted successfully",
            });

        }else{
            return res.status(404).json({ message : "Question not found" });
        }

    }catch(err){
        console.log(" Error in deleting question ",err);
        return res.status(500).json({
            message : "Internal server error in deleting question",
        });
    }

}
    
  
  //To view a question and it’s options
const viewQuestion = async function(req, res){

    try{

        let question = await Questions.findById(req.params.id).populate('option');
        console.log("question",question);

        return res.status(200).json({ question });

    }catch(err){

        console.log("Error in viewing question  ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in viewing question" }
        });

    }

}



  module.exports ={
    createQuestion,
    viewQuestion,
    deleteQuestion


  }