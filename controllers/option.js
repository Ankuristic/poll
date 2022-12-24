const express= require('express');
const mongoose= require('mongoose');

// const Option= require('../models/option');
const Option= require('../models/option');
const Questions= require('../models/question');



//To add options to a specific question
 const createNewOption = async function(req, res){

  try{
      // verify if a question exists
      let question = await Questions.findById(req.params.id);
      console.log("question",question);

      if(question){
          // create an option
          let option = await Option.create({
              text : req.body.text,
              votes : req.body.votes,
              
              question : req.params.id,
          });
          console.log("option",option);

          // option.link_vote = "https://pollingapi.live/api/v1/options/"+option.id+"/add_vote";
          option.link = "http://localhost:9000/options/"+option.id+"/add_vote";
          console.log("ank", option.link_vote);
         let ankur =  await option.save();
          console.log("ankur",ankur);
          // question.push(option.link_vote)
         let qu= await  question.save();
         console.log("amber",qu)

          return res.status(200).json({option, data:{
              "message" : "New Option created Successfully"
          }});
      }
      return res.json({question});

  }catch(err){
      console.log("******* Error in creating option ********* ",err);
      return res.status(500).json({
          data : { message : "Internal Server Error in creating an option" }
      });
  }

};
  
  //To delete an option
  const deleteOption = async function(req, res){

    try{

        let id = req.params.id;

        // checking if option exists
        let option = await Option.findById(id);

        //checking if number of votes are > 0, if true, an option should not be deleted
        if(option.votes > 0){
            return res.status(404).json({
                data : { message : "Option can not be deleted, count of votes > 0 " }
            });
        }

        // deleting option from question.options array first
        await Questions.findByIdAndUpdate(option.question, {$pull : {options : id}});

        // now deleting the option from the db
        await Option.findByIdAndDelete(id);

        return res.status(200).json({
            data : { message : "Option deleted sucessfully !" }
        });

    }catch(err){
        console.log(" Error in deleting option ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in deleting vote" }
        });  
    }

};
  
  //To increment the count of votes
 const incrementVotes = async function (req, res) {
    try {
      // finding the particular option
      const option = await Option.findById(req.params.id);
      // incrementing the votes
      option.votes += 1;
      await option.save();
      // returning the response
      return res.status(200).json({
        message: "vote added",
        votes: option.votes,
      });
    } catch (err) {
      // checking for the error
      res.status(465).json({
        message: "could not increment the count",
        err: "internal server error",
      });
    }
  };


  module.exports ={
    createNewOption,
    deleteOption,
    incrementVotes

  }