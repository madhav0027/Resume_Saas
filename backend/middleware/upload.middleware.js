// upload.middleware.js
const multer = require("multer");

module.exports = multer({ dest: "/uploads/" });