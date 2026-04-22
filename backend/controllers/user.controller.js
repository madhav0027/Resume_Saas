const Plan = require("../models/Plan");
const User = require("../models/User");

exports.user = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await User.findById(req.user.userId).select("-password");

    const plan = await Plan.findOne({userId:req.user.userId});
    if (!plan) return res.status(400).json({ msg: "Invalid credentials" });
    

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        profilepic: user.profilepic,
        name: user.name,
        email: user.email,
        plan:plan.plan
      },
    });
  } catch (err) {
    console.error("User fetch error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.logout = async (req,res) => {

    try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await User.updateOne(
        { refreshToken: refreshToken },
        { $unset: { refreshToken: "" } }
      );
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/"
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
}