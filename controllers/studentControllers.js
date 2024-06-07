const db = require("../config/db");

// GET ALL STUDENTS LIST
const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT  * FROM student");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Students Records",
      totalStudents: data[0].length,
      data: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get all student api",
      err,
    });
  }
};

// GET INDIVIDUAL STUDENT BY ID

const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid or  Provide Wrong Student ID",
      });
    }
    const data = await db.query(`SELECT * FROM student WHERE id=?`, [
      studentId,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Records Found",
      });
    }
    res.status(200).send({
      success: true,
      studentDetails: data[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get student by id api",
      err,
    });
  }
};

//CREATE NEW STUDENT

const createStudent = async (req, res) => {
  try {
    const { name, semester, credit, department, cgpa } = req.body;
    if (!name || !semester || !credit || !department || !cgpa) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const data = await db.query(
      `INSERT INTO student (name, semester, credit, department, cgpa) VALUES (?,?,?,?,?)`,
      [name, semester, credit, department, cgpa]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in Insert Query",
      });
    }
    res.status(201).send({
      success: true,
      message: "New Student Record Created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create Student API",
      err,
    });
  }
};

// UPDATE STUDENT BY ID
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or Provide ID",
      });
    }
    const { name, semester, credit, department, cgpa } = req.body;
    const oldData = await db.query(`SELECT * FROM student where id=?`, [
      studentId,
    ]);
    const dt = oldData[0][0];
    if (
      name === dt.name &&
      semester === dt.semester &&
      credit === dt.credit &&
      department === dt.department &&
      cgpa === dt.cgpa
    ) {
      return res.status(404).send({
        success: false,
        message: "Provide new Details",
      });
    }
    const data = await db.query(
      `UPDATE student SET name=?, semester=?, credit=?, department=?, cgpa=? WHERE id=?`,
      [name, semester, credit, department, cgpa, studentId]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in Update Query",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student Record Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update Student API",
      error,
    });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid ID or Provide ID",
      });
    }
    await db.query(`DELETE FROM student WHERE id=?`, [studentId]);

    res.status(200).send({
      success: true,
      message: "Student Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Student API",
      error,
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
