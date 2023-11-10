const express = require("express");

// const  student_Act = require("../controllers/students"); 
const questions = require("../controllers/question");


// initalizing the router
const router = express.Router();



//adding a route for creating a quetions
router.post("/create", questions.createQuestion);

// adding a route for deleting an question
router.get("/:id/delete", questions.deleteQuestion);

// adding a route for getting the details of a particular question
router.get("/:id", questions.viewQuestion);

// get form data

// router.get('/form',questions.getAddForm)

module.exports=router;