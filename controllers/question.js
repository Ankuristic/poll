const express= require('express');
const mongoose= require('mongoose');

const Question= require('../models/question');

const router= express.Router();

const getStudents = async (req, res) => {
    try {
        var id = req.params.id
        const questions= await Question.findById(id);
        console.log("questions",questions);
        
        res.status(200).json(questions);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

const getspecStudent = async (req,res) => {
    const roll = req.params.roll;

    try {
        const stud = await Student.findOne({roll: roll});

        res.status(200).json(stud);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}

const createstudent =  async (req, res) => {
    console.log(req.body.title);
    const questions = new Question({
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

const updatestudent = async (req, res) => {
    const id= req.params.id;
    try{
        await Student.findOneAndUpdate({
            id: id,
        },
        {   
            name:req.body.name,
            registration:req.body.registration,
            subjects:req.body.subjects,
            created_on:req.body.created_on
        }
        )
        res.status(202).json({roll: roll});

    } catch (error) {
        res.status(401).json({message: error.message});
    }
    
}

const deletequestion = async (req, res) => {
    const id= req.params.id;

    try {
      const ankur=  await Question.findOneAndRemove({id: id});
      console.log("ankur",ankur);
        res.status(203).json({message:'deleted successfulyy',id:id});

    }catch(error) {
        res.status(402).json({message: error.message});
    }
}

module.exports.getStudents= getStudents;
module.exports.createstudent= createstudent;
module.exports.getspecStudent= getspecStudent;
module.exports.updatestudent= updatestudent;
module.exports.deletequestion= deletequestion;