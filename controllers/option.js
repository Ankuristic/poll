const express= require('express');
const mongoose= require('mongoose');

const Option= require('../models/option');

const router= express.Router();

const getStudents = async (req, res) => {
    try {
        const student= await Student.find();
        
        res.status(200).json(student);
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

const createoption =  async (req, res) => {
    console.log(req.body.title);
    const newstudent = new Option({
        // name:req.body.name,
        // roll:req.body.roll,
        // registration:req.body.registration,
        // subjects:req.body.subjects,
        // created_on:req.body.created_on
        title:req.body.title,
        option:req.body.option,


    })
    try {
     const ankur=   await newstudent.save();
     console.log("ankur",ankur);

        res.status(201).json(newstudent);

    } catch(error) {
        res.status(400).json({ message : error.message});
    }

}

const updatestudent = async (req, res) => {
    const roll= req.params.roll;
    try{
        await Student.findOneAndUpdate({
            roll: roll,
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

const deletestudent = async (req, res) => {
    const roll= req.params.roll;

    try {
        await Student.findOneAndRemove({roll: roll});
        res.status(203).json({roll:roll});

    }catch(error) {
        res.status(402).json({message: error.message});
    }
}

module.exports.getStudents= getStudents;
module.exports.createoption= createoption;
module.exports.getspecStudent= getspecStudent;
module.exports.updatestudent= updatestudent;
module.exports.deletestudent= deletestudent;