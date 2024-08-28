const Student = require("../schemas/Student");

// get all students
const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students.length) {
      res.status(200).json({ msg: "No students in the DB" });
    } else {
      res.status(200).json({ data: students });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get one student
const getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (student) {
      return res.status(200).json({ data: student });
    }
    res.status(404).json({ msg: "I did not find this student :(" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// create a new student
const createStudent = async (req, res) => {
  try {
    // We grab exactly the keys that we have in the blueprint (Schema)
    const { first_name, last_name, email } = req.body;
    const student = await Student.create({ first_name, last_name, email });
    res.status(201).json({
      message: "Student created successfully!",
      data: student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a student
const updateStudent = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const { id } = req.params;

    const student = await Student.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        email,
      },
      {
        new: true,
      }
    );

    if (!student) {
      res.status(404).json({ msg: "I don't know this student :(" });
    } else {
      res.status(200).json({ msg: "Student updated successfully", student });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a student
const deleteOneStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      res.status(404).json({ msg: "I don't know this student :(" });
    } else {
      res.status(200).json({ msg: "Student deleted successfully", student });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllStudent,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteOneStudent,
};
