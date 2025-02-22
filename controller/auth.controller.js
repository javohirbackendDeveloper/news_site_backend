const jwt = require("jsonwebtoken");
const redis = require("../libraries/redis");
const authSchema = require("../schema/auth.schema");
require("dotenv").config();

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

    const payload = { email, role: "admin" };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7m",
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

    await redis.set(
      `refresh_token:${user?._id}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60 * 1000
    );

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
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refreshToken", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

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

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    console.log(storedToken);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQwMDU5MTQwLCJleHAiOjE3NDAwNTk1NjB9.yxF1A-mfwtimWTifwhHUGpOt1xdH0RNYpgPaMpMrQmE
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
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

module.exports = { login, logout, refreshToken, checkAuth, register };
