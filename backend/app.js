require('dotenv').config()
const express = require("express");
const resumeRoutes = require("./routes/resume.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const aiRoutes = require("./routes/groq.routes");
const cors = require('cors');
const db = require("./database/db");
const app = express();
const cookieparser = require('cookie-parser');

// app.use(helmet())
app.use(cookieparser());
app.use(express.json());
app.use(cors({
    origin:"http://192.168.31.118:8080",
    credentials:true
}))

db();

app.use("/api/resume", resumeRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/",userRoutes);
app.use("/ai/",aiRoutes);

app.get('/',(req,res) => {
    res.json({message:"MiraiCV is running"})
})

module.exports = app;