// resume.routes.js
const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {uploadResume, resumesave, updateresume, getallresume, getresumeid} = require("../controllers/resume.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/upload", upload.single("file"), uploadResume);

router.post('/',authMiddleware,resumesave);

router.put('/:id',authMiddleware,updateresume);

router.get('/resumes',authMiddleware,getallresume)

router.post('/resumeid',getresumeid);

module.exports = router;