const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentControllers");

// router object
const router = express.Router();

// routes

// GET ALL STUDENTS || GET
router.get("/getall", getStudents);

// GET INDIVIDUAL STUDENT || GET

router.get("/get/:id", getStudentById);

// CREATE STUDENT || POST
router.post("/create", createStudent);

// UPDATE STUDENT || PUT
router.put("/update/:id", updateStudent);

// DELETE STUDENT || DELETE

router.delete("/delete/:id", deleteStudent);

module.exports = router;
