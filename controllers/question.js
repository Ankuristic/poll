const express= require('express');
const mongoose= require('mongoose');

const Questions= require('../models/question');
const Option= require('../models/option');


// const router= express.Router();

// const getStudents = async (req, res) => {
//     try {
//         var id = req.params.id
//         const questions= await Question.findById(id);
//         console.log("questions",questions);
        
//         res.status(200).json(questions);
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

// const updatestudent = async (req, res) => {
//     const id= req.params.id;
//     try{
//         await Student.findOneAndUpdate({
//             id: id,
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

// const deletequestion = async (req, res) => {
//     const id= req.params.id;

//     try {
//       const ankur=  await Question.findOneAndRemove({id: id});
//       console.log("ankur",ankur);
//         res.status(203).json({message:'deleted successfulyy',id:id});

//     }catch(error) {
//         res.status(402).json({message: error.message});
//     }
// }

// module.exports.getStudents= getStudents;
// module.exports.createstudent= createstudent;
// module.exports.getspecStudent= getspecStudent;
// module.exports.updatestudent= updatestudent;
// module.exports.deletequestion= deletequestion;



//To create a question
// const createQuestion = async function (req, res) {
//     try {
//       // creating the questions
//       for (let title of req.body.title) {
//         await Questions.create({ title });
//       }
//       // returning the resoponse
//       return res.status(200).json({
//         message: "question created succesfully",
//       });
//     } catch (err) {
//       // checking for the error
//       return res.status(465).json({
//         message: "error in creating a questions",
//         error: err.message,
//       });
//     }
//   };
  
  //To delete a question
  const deleteQuestion = async function (req, res) {
    try {
      // finding the particular Question
      const question = await Questions.findById(req.params.id);
      // deleting all the options related to that question
      for (let id of question.options) {
        let option = await Option.findById(id);
        // checking whether option contains any votes or not
        if (option.votes > 0) {
          return res.status(401).json({
            message: "you cannot delete that option",
          });
        }
        // delete that particular option
        await option.remove();
      }
      // deleting the question
      await question.remove();
      // sending response
      return res.status(200).json({
        message: "question deleted succesfully",
      });
    } catch (err) {
      // checking for error
      return res.status(465).json({
        message: "internal server error",
        error: err.message,
      });
    }
  };
  
  //To view a question and it’s options
const viewQuestion = async function(req, res){

    try{

        let question = await Questions.findById(req.params.id).populate('option');
        console.log("question",question);

        return res.status(200).json({ question });

    }catch(err){

        console.log("******* Error in viewing question ********* ",err);
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