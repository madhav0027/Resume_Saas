// resume.routes.js
const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const {uploadResume, resumesave, updateresume, getallresume, getresumeid} = require("../controllers/resume.controller");
const authMiddleware = require("../middleware/auth.middleware");


//S3 CLoud flare setup
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");


// const s3 = new S3Client({
//     region:"auto",
//     endpoint:process.env.S3STORAGE,
//     credentials:{
//         accessKeyId:process.env.R2_ACCESS_KEY,
//         secretAccessKey:process.env.R2_SECRET_KEY
//     }
// })


router.post("/upload", upload.single("file"), uploadResume);

router.post('/',authMiddleware,resumesave);

router.put('/:id',authMiddleware,updateresume);

router.get('/resumes',authMiddleware,getallresume)

router.post('/resumeid',getresumeid);

module.exports = router;