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

/**
 * @swagger
 * /social/create:
 *   post:
 *     summary: Create a new social media link
 *     tags: [Social Links]
 *     description: Add a new social media link to the user's account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - platform
 *               - url
 *             properties:
 *               platform:
 *                 type: string
 *                 example: "Facebook"
 *               url:
 *                 type: string
 *                 example: "http://facebook.com/username"
 *     responses:
 *       201:
 *         description: Social media link added successfully.
 *       400:
 *         description: Invalid data provided.
 *       500:
 *         description: Server error.
 */
socialRouter.post("/create", protectRoute, addSocial);

/**
 * @swagger
 * /social/delete/{id}:
 *   delete:
 *     summary: Delete a social media link by ID
 *     tags: [Social Links]
 *     description: Delete a specific social media link by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the social media link to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Social media link deleted successfully.
 *       404:
 *         description: Social media link not found.
 *       500:
 *         description: Server error.
 */
socialRouter.delete("/delete/:id", protectRoute, deleteSocial);

/**
 * @swagger
 * /social/update/{socialId}:
 *   put:
 *     summary: Update a social media link by ID
 *     tags: [Social Links]
 *     description: Update the URL or platform of an existing social media link.
 *     parameters:
 *       - in: path
 *         name: socialId
 *         required: true
 *         description: The ID of the social media link to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *                 example: "Twitter"
 *               url:
 *                 type: string
 *                 example: "http://twitter.com/username"
 *     responses:
 *       200:
 *         description: Social media link updated successfully.
 *       400:
 *         description: Invalid data provided.
 *       500:
 *         description: Server error.
 */
socialRouter.put("/update/:socialId", protectRoute, updatesocials);

/**
 * @swagger
 * /social/getOne/{id}:
 *   get:
 *     summary: Get a specific social media link by ID
 *     tags: [Social Links]
 *     description: Retrieve a single social media link by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the social media link to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single social media link.
 *       404:
 *         description: Social media link not found.
 *       500:
 *         description: Server error.
 */
socialRouter.get("/getOne/:id", getOneSocialLink);

/**
 * @swagger
 * /social/get:
 *   get:
 *     summary: Get all social media links
 *     tags: [Social Links]
 *     description: Retrieve all social media links associated with the user.
 *     responses:
 *       200:
 *         description: A list of social media links.
 *       500:
 *         description: Server error.
 */
socialRouter.get("/get", getSocialLinks);

module.exports = socialRouter;
