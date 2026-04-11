
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