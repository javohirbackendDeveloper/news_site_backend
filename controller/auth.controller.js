const jwt = require("jsonwebtoken");
const authSchema = require("../schema/auth.schema");
require("dotenv").config();

// THIS IS ONLY FOR TESTING
const register = async (req, res) => {
  await authSchema.create({ ...req.body });
};
const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await authSchema.findOne({ email });

    if (!user) {
      return res.json({ message: "This admin not found" });
    }
    const checkUsername = await authSchema.findOne({ username });

    if (!checkUsername) {
      return res.json({ message: "This username not found" });
    }

    if (password !== user.password) {
      return res.json({ message: "Siz kiritgan parol xato" });
    }

    const payload = { email, role: "admin" };
    const accessToken = jwt.sign(payload, "ACCESS_TOKEN_SECRET", {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, "REFRESH_TOKEN_SECRET", {
      expiresIn: "7d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      user_id: user._id,
      email,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET");
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET");

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      "ACCESS_TOKEN_SECRET",
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { password } = req.params;
    const { ...data } = req.body;
    const currentUser = req.user;

    if (currentUser.password !== password) {
      return res.json({ message: "Siz noto'g'ri parol kiritdingiz" });
    }

    const updatedProfile = await authSchema.findOneAndUpdate(
      { _id: currentUser._id },
      data
    );

    return res.json({ updatedProfile });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
  checkAuth,
  register,
  updateProfile,
};
