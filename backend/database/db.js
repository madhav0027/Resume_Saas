const mongoose = require("mongoose");

const db = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected "))
    .catch((err) => console.error("Mongo error ", err));
}

module.exports = db;