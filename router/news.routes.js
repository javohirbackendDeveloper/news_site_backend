const { Router } = require("express");
const {
  createNews,
  getNews,
  deleteNews,
  updateNews,
  getNewsByCategory,
  getMostWatchedNews,
  getOneNews,
  searchNews,
  getRelevantNews,
} = require("../controller/news.controller");
const protectRoute = require("../middleware/auth.middleware");

const newsRouter = Router();

newsRouter.post("/create", protectRoute, createNews);
newsRouter.get("/get", getNews);
newsRouter.delete("/deleteNews/:newsId", protectRoute, deleteNews);
newsRouter.put("/updateNews/:newsId", protectRoute, updateNews);
newsRouter.get("/getNewsByCategory/:category", getNewsByCategory);
newsRouter.get("/getMostWatchedNews", getMostWatchedNews);
newsRouter.get("/getOneNew/:newsId", getOneNews);
newsRouter.get("/searchNews", searchNews);
newsRouter.get("/getRelevantNews", getRelevantNews);

module.exports = newsRouter;
