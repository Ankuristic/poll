const express = require("express");

// const  student_Act = require("../controllers/students"); 
const options = require("../controllers/option");

//initalizing router
const router = express.Router();

// router.get('/', student_Act.getStudents);
// router.get('/:roll', student_Act.getspecStudent);
// router.post("/:id/add_vote", options.addVote);
// router.post('/create', options.createoption);
// // router.patch('/:roll', student_Act.updatestudent);
// router.get('/:id/delete', options.deleteoption);

// adding a route for creating options
router.post("/:id/create", options.createNewOption);
// adding a route for deleting  an options
router.get("/:id/delete", options.deleteOption);

// adding a route for increaing the vote for an option
router.get("/:id/add_vote", options.incrementVotes);




module.exports=router;