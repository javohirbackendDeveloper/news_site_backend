const { Router } = require("express");
const protectRoute = require("../middleware/auth.middleware");
const {
  sendMessage,
  getMessages,
  deleteApply,
  getByMessageSubject,
  getOneMessage,
} = require("../controller/apply.controller");

const applyRouter = Router();

applyRouter.post("/create", sendMessage);
applyRouter.get("/get", protectRoute, getMessages);
applyRouter.get("/getOneMessage/:id", protectRoute, getOneMessage);
applyRouter.get("/getByMessageSubject", protectRoute, getByMessageSubject);
applyRouter.delete("/delete/:id", protectRoute, deleteApply);

module.exports = applyRouter;
