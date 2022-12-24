const express= require('express');
const mongoose= require('mongoose');

// const Option= require('../models/option');
const Option= require('../models/option');
const Questions= require('../models/question');



const router= express.Router();

// const getStudents = async (req, res) => {
//     try {
//         const student= await Student.find();
        
//         res.status(200).json(student);
//     } catch(error) {
//         res.status(404).json({message: error.message});
//     }
// }

// const getspecStudent = async (req,res) => {
//     const roll = req.params.roll;

//     try {
//         const stud = await Student.findOne({roll: roll});

//         res.status(200).json(stud);
//     } catch(error) {
//         res.status(404).json({ message: error.message});
//     }
// }

// const createoption =  async (req, res) => {
//     console.log(req.body.title);
//     const newoption = new Option({
//         // name:req.body.name,
//         // roll:req.body.roll,
//         // registration:req.body.registration,
//         // subjects:req.body.subjects,
//         // created_on:req.body.created_on
//         // title:req.body.title,
//         // option:req.body.option,
//         id:req.body.id,
//         text:req.body.text,


//     })
//     try {
//      const ankur=   await newoption.save();
//      console.log("ankur",ankur);

//         res.status(201).json(newoption);

//     } catch(error) {
//         res.status(400).json({ message : error.message});
//     }

// }

// const updatestudent = async (req, res) => {
//     const roll= req.params.roll;
//     try{
//         await Student.findOneAndUpdate({
//             roll: roll,
//         },
//         {   
//             name:req.body.name,
//             registration:req.body.registration,
//             subjects:req.body.subjects,
//             created_on:req.body.created_on
//         }
//         )
//         res.status(202).json({roll: roll});

//     } catch (error) {
//         res.status(401).json({message: error.message});
//     }
    
// }

// const deleteoption = async (req, res) => {
//     const id= req.params.id;
//     console.log("id",id);

//     try {
//       const ankur =   await Option.findOneAndRemove({id: id});
//       console.log("ankur",ankur);
//         res.status(203).json({message:"deleted successfully",id:id});

//     }catch(error) {
//         res.status(402).json({message: error.message});
//     }
// }

// const addVote =  async(req,res)=>{
//     // const id= req.params.id;
//      try {
//         const option = await Option.findById(req.params.id);
//         // increamenting thee votes

//         option.votes +=1;
//         await option.save();
//         // returning the response
//         return res.status(200).json({

//             message:"vote added",
//             votes: option.votes,
//         });

//      } catch(err){
//         // checking for the error
//         res.status(465).json({
//             message:"could not increment the count",
//             err:"internal server error"
//         });
//      }


// }


// const addOption =  async (req,res) =>{
//     try {
//         const question = await Questions.findById(req.params.id);
//     for (let option of req.body.options) {
//       // creating options
//       const currOption = await Option.create({
//         text: option,
//       });
//       // creating dynamic link
//       currOption.link_to_vote =
//         "http://" +
//         req.headers.host +
//         "/options/" +
//         currOption.id +
//         "/add_vote";
//       currOption.save();
//       // pushing options id into question
//       question.options.push(currOption.id);
//       question.save();
//     }
//     // returning the resoponse
//     return res.status(200).json({
//       message: "option added succesfully",
//     });
//   } catch (err) {
//     // checking for error
//     return res.status(465).json({
//       message: "internal server error",
//       error: err.message,
//     });
//   }
// };



// module.exports.getStudents= getStudents;
// module.exports.createoption= createoption;
// module.exports.getspecStudent= getspecStudent;
// module.exports.updatestudent= updatestudent;
// module.exports.deleteoption= deleteoption;
// module.exports.addVote=addVote;
// module.exports.addOption=addOption;


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

          
        // let joi=  question.options.push(option.link);
         let amber= await  question.save();
         console.log("amber",amber)

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
  const deleteOption = async function (req, res) {
    try {
      // finding the particular option
      const option = await Option.findById(req.params.id);
      // checking whether it contains any vote or not
      if (option.votes > 0) {
        return res.status(401).json({
          message: "You cannot delete that vote",
        });
      }
      // finding the question and updating it
      await Questions.updateOne(
        { options: { $in: req.params.id } },
        { $pull: { options: { $eq: req.params.id } } }
      );
      // deleting the particular option
      await option.remove();
      // returning the response
      return res.status(200).json({
        message: "option deleted succesfully",
      });
    } catch (err) {
      // checking for error
      return res.status(465).json({
        message: "internal server error",
        error: err.message,
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