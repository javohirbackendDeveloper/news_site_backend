const { Router } = require("express");
const {
  login,
  logout,
  refreshToken,
  checkAuth,
  register,
} = require("../controller/auth.controller");
const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/refreshToken", refreshToken);
authRouter.post("/checkAuth", checkAuth);

module.exports = authRouter;
