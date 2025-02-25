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
  getRelatedNews,
} = require("../controller/news.controller");
const protectRoute = require("../middleware/auth.middleware");

const newsRouter = Router();

/**
 * @swagger
 * /news/create:
 *   post:
 *     summary: Create a new news article
 *     tags: [News]
 *     description: Create a new news article with title, description, and image.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Breaking News"
 *               description:
 *                 type: string
 *                 example: "This is a description of breaking news."
 *               category:
 *                 type: string
 *                 example: "Politics"
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: News created successfully.
 *       400:
 *         description: Invalid data provided.
 *       500:
 *         description: Server error.
 */
newsRouter.post("/create", protectRoute, createNews);

/**
 * @swagger
 * /news/get:
 *   get:
 *     summary: Get all news articles
 *     tags: [News]
 *     description: Retrieve all news articles with pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number for pagination.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of articles per page.
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of news articles.
 *       500:
 *         description: Server error.
 */
newsRouter.get("/get", getNews);

/**
 * @swagger
 * /news/deleteNews/{newsId}:
 *   delete:
 *     summary: Delete a news article by ID
 *     tags: [News]
 *     description: Delete a specific news article by its ID.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         description: The ID of the news article to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News deleted successfully.
 *       404:
 *         description: News not found.
 *       500:
 *         description: Server error.
 */
newsRouter.delete("/deleteNews/:newsId", protectRoute, deleteNews);

/**
 * @swagger
 * /news/updateNews/{newsId}:
 *   put:
 *     summary: Update a news article by ID
 *     tags: [News]
 *     description: Update an existing news article's details.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         description: The ID of the news article to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated News"
 *               description:
 *                 type: string
 *                 example: "Updated description for the news article."
 *               category:
 *                 type: string
 *                 example: "Technology"
 *               image:
 *                 type: string
 *                 example: "http://example.com/updated-image.jpg"
 *     responses:
 *       200:
 *         description: News updated successfully.
 *       400:
 *         description: Invalid data provided.
 *       500:
 *         description: Server error.
 */
newsRouter.put("/updateNews/:newsId", protectRoute, updateNews);

/**
 * @swagger
 * /news/getNewsByCategory/{category}:
 *   get:
 *     summary: Get news by category
 *     tags: [News]
 *     description: Get news articles filtered by a specific category.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category to filter news by.
 *         schema:
 *           type: string
 *           example: "Politics"
 *     responses:
 *       200:
 *         description: List of news articles in the specified category.
 *       500:
 *         description: Server error.
 */
newsRouter.get("/getNewsByCategory/:category", getNewsByCategory);

/**
 * @swagger
 * /news/getMostWatchedNews:
 *   get:
 *     summary: Get the most watched news articles
 *     tags: [News]
 *     description: Retrieve the top 5 most watched news articles.
 *     responses:
 *       200:
 *         description: List of most watched news articles.
 *       500:
 *         description: Server error.
 */
newsRouter.get("/getMostWatchedNews", getMostWatchedNews);

/**
 * @swagger
 * /news/getOneNew/{newsId}:
 *   get:
 *     summary: Get a specific news article by ID
 *     tags: [News]
 *     description: Retrieve a single news article by its ID and increment views.
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         description: The ID of the news article to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single news article.
 *       500:
 *         description: Server error.
 */
newsRouter.get("/getOneNew/:newsId", getOneNews);

/**
 * @swagger
 * /news/searchNews:
 *   get:
 *     summary: Search news by description and category
 *     tags: [News]
 *     description: Search news articles by description and category.
 *     parameters:
 *       - in: query
 *         name: searching_item
 *         required: true
 *         description: The search term to filter news articles by.
 *         schema:
 *           type: string
 *           example: "Election"
 *     responses:
 *       200:
 *         description: List of news articles matching the search term.
 *       500:
 *         description: Server error.
 */
newsRouter.get("/searchNews", searchNews);

/**
 * @swagger
 * /news/getRelevantNews:
 *   get:
 *     summary: Get relevant news
 *     tags: [News]
 *     description: Retrieve the most relevant news (based on type "dolzarb").
 *     responses:
 *       200:
 *         description: A list of relevant news articles.
 *       500:
 *         description: Server error.
 */
newsRouter.get("/getRelevantNews", getRelevantNews);

/**
 * @swagger
 * /news/getRelatedNews/{category}:
 *   get:
 *     summary: Get related news articles by category
 *     tags: [News]
 *     description: Retrieve related news articles based on a specific category.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category to filter related news by.
 *         schema:
 *           type: string
 *           example: "Politics"
 *     responses:
 *       200:
 *         description: A list of related news articles.
 *       500:
 *         description: Server error.
 */
newsRouter.get("/getRelatedNews/:category", getRelatedNews);

module.exports = newsRouter;
