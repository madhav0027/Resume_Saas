const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const { generateAccessToken, generateRefreshToken } = require('../utils/token');
const Plan = require("../models/Plan");

// register
exports.register = async (req,res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("cred1")

    const verificationToken = crypto.randomBytes(32).toString("hex");

    console.log('cred2')

    const user = await User.create({
      name,
      email,
      profilepic:`https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      password: hashedPassword,
      verificationToken,
      verifyTokenExpiry: Date.now() + 1000 * 60 * 60, // 1 hour
    });

    await Plan.create({
      userId:user._id,
      plan:"free",
      price:0,
      endDate: new Date("2099-12-31")
    })

    const verifyLink = `${process.env.SERVER_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify your account",
      `<p>Click to verify:</p><a href="${verifyLink}">${verifyLink}</a>`
    );

    res.json({ msg: "Registered! Check your email to verify." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.verify = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send("Invalid token");

    user.isVerified = true;
    user.verificationToken = null;
    user.verifyTokenExpiry = null;

    await user.save();

    res.send("Email verified successfully!");
  } catch (err) {
    res.status(500).send("Error verifying email");
  }
};


// LOGIN
exports.login =  async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("login")

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const plan = await Plan.findOne({userId:user._id});
    if (!plan) return res.status(400).json({ msg: "Invalid plan" });

    if (!user.isVerified)
      return res.status(400).json({ msg: "Verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path:'/',
        maxAge: 15 * 60 * 1000,
        });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path:'/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: {
        id: user._id,
        profilepic:user.profilepic,
        name: user.name,
        email: user.email,
        plan:plan.plan
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//refresh 
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.sendStatus(403);

    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(decoded.userId);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path:'/',
      maxAge: 15 * 60 * 1000,
    });

    res.json({ msg: "Token refreshed" });
  } catch {
    res.sendStatus(403);
  }
};

