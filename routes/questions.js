const express = require("express");

// const  student_Act = require("../controllers/students"); 
const questions = require("../controllers/question");

const router = express.Router();

// router.get('/', questions.getStudents);
// router.get('/:roll', student_Act.getspecStudent);
router.post('/create', questions.createstudent);
// router.patch('/:roll', student_Act.updatestudent);
router.get('/:id/delete', questions.deletequestion);
router.get('/:id',questions.getStudents);

module.exports=router;