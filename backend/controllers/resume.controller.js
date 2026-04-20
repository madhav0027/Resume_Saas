
const { default: Resume } = require("../models/Resume");
const { parseResume } = require("../services/parser.service");

exports.uploadResume = async (req, res) => {
  try {
    console.log(req.file);
    const result = await parseResume(req.file.path);
    console.log(result)
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resumesave =  async (req, res) => {
  try {
    console.log("call resumesave")
    const { title, template, data } = req.body;

    const resume = await Resume.create({
      userId: req.user.userId,
      title,
      template,
      data,
    });

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: "Error saving resume",err });
  }
};

exports.updateresume = async (req,res) => {
  try {
    console.log("Update resume")
    const updated = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      {
        title:req.body.data.fullName,
        data: req.body.data,
        template: req.body.template,
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating resume" });
  }
}

exports.getallresume = async (req,res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user.userId,
    });

    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resumes" });
  }
}

exports.getresumeid = async (req,res) => {
  console.log("resume by id")
  const {id} = req.body;
  try {
    const resumes = await Resume.findById(id);

    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resumes" });
  }
}