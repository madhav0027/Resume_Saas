const express = require("express");
const resumeRoutes = require("./routes/resume.routes");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/resume", resumeRoutes);

app.get('/',(req,res) => {
    res.json({message:"MiraiCV is running"})
})

module.exports = app;