const { Router } = require("express");
const protectRoute = require("../middleware/auth.middleware");
const {
  createEnsiclopedy,
  getRandomEnsiclopedies,
  updatedEnsic,
  deleteEnsics,
  getOneEnsic,
  getByCharacter,
} = require("../controller/ensiclopedy.controller");

const ensiclopedyRouter = Router();

ensiclopedyRouter.post("/create", protectRoute, createEnsiclopedy);
ensiclopedyRouter.get("/getRandomEnsic", getRandomEnsiclopedies);
ensiclopedyRouter.put("/update/:ensicId", protectRoute, updatedEnsic);
ensiclopedyRouter.delete("/delete/:ensicId", protectRoute, deleteEnsics);
ensiclopedyRouter.get("/getOne/:id", getOneEnsic);
ensiclopedyRouter.get("/getByCharacter", getByCharacter);

module.exports = ensiclopedyRouter;
