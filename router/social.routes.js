const { Router } = require("express");
const protectRoute = require("../middleware/auth.middleware");
const {
  addSocial,
  deleteSocial,
  updatesocials,
  getOneSocialLink,
  getSocialLinks,
} = require("../controller/social_links.controller");

const socialRouter = Router();

socialRouter.post("/create", protectRoute, addSocial);
socialRouter.delete("/delete/:id", protectRoute, deleteSocial);
socialRouter.put("/update/:socialId", protectRoute, updatesocials);
socialRouter.get("/getOne/:id", getOneSocialLink);
socialRouter.get("/get", getSocialLinks);

module.exports = socialRouter;
