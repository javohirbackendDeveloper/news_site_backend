const jwt = require("jsonwebtoken");
const authSchema = require("../schema/auth.schema");
require("dotenv").config();

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.json({
        message: "Qaytadan admin sifatida login qiling",
      });
    }

    const decoded = jwt.verify(token, "process.env.ACCESS_TOKEN_SECRET");

    if (!decoded) {
      return res.json({ message: "Token is invalid" });
    }

    const user = await authSchema.findOne({ email: decoded.email });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = protectRoute;
