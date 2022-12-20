const express = require("express");

// const  student_Act = require("../controllers/students"); 
const questions = require("../controllers/question");

const router = express.Router();

// router.get('/', student_Act.getStudents);
// router.get('/:roll', student_Act.getspecStudent);
router.post('/create', questions.createstudent);
// router.patch('/:roll', student_Act.updatestudent);
// router.delete('/:roll', student_Act.deletestudent);

module.exports=router;