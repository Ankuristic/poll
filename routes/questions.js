const express = require("express");

// const  student_Act = require("../controllers/students"); 
const questions = require("../controllers/question");


// initalizing the router
const router = express.Router();

// router.get('/', questions.getStudents);
// // router.get('/:roll', student_Act.getspecStudent);
// router.post('/create', questions.createstudent);
// // router.patch('/:roll', student_Act.updatestudent);
// router.get('/:id/delete', questions.deletequestion);
// router.get('/:id',questions.getStudents);

//adding a route for creating a quetions
router.post("/create", questions.createQuestion);

// adding a route for deleting an question
router.get("/:id/delete", questions.deleteQuestion);

// adding a route for getting the details of a particular question
router.get("/:id", questions.viewQuestion);

module.exports=router;