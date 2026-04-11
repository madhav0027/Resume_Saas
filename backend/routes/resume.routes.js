// resume.routes.js
const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {uploadResume} = require("../controllers/resume.controller");

router.post("/upload", upload.single("file"), uploadResume);

module.exports = router;