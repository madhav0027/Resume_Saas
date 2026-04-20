import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  title: {
    type: String,
    default: "My Resume",
  },

  template: {
    type: String,
    default: "Default",
  },

  downloads: {
    type: Number,
    default: 0,
  },

  data: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    summary: String,

    experience: [
      {
        id: String,
        title: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    education: [
      {
        id: String,
        degree: String,
        school: String,
        year: String,
      },
    ],

    skills: [String],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Resume", resumeSchema);