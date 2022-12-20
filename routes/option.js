const express = require("express");

// const  student_Act = require("../controllers/students"); 
const options = require("../controllers/option");

const router = express.Router();

// router.get('/', student_Act.getStudents);
// router.get('/:roll', student_Act.getspecStudent);
router.post('/create', options.createoption);
// router.patch('/:roll', student_Act.updatestudent);
// router.delete('/:roll', student_Act.deletestudent);

module.exports=router;