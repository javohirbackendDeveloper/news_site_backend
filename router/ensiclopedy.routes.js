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

/**
 * @swagger
 * /ensiclopedy/create:
 *   post:
 *     summary: Create a new encyclopedia entry
 *     tags: [Encyclopedia]
 *     description: Create a new encyclopedia entry with title and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Science of the Universe"
 *               description:
 *                 type: string
 *                 example: "A detailed description of the universe's origin and structure."
 *     responses:
 *       201:
 *         description: Encyclopedia entry created successfully.
 *       400:
 *         description: Invalid input data or entry already exists.
 *       500:
 *         description: Server error.
 */
ensiclopedyRouter.post("/create", protectRoute, createEnsiclopedy);

/**
 * @swagger
 * /ensiclopedy/getRandomEnsic:
 *   get:
 *     summary: Get random encyclopedia entries
 *     tags: [Encyclopedia]
 *     description: Retrieve 10 random encyclopedia entries.
 *     responses:
 *       200:
 *         description: A list of random encyclopedia entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "607c72ef153207001f65b89"
 *                   title:
 *                     type: string
 *                     example: "Science of the Universe"
 *                   description:
 *                     type: string
 *                     example: "A detailed description of the universe's origin and structure."
 *       500:
 *         description: Server error.
 */
ensiclopedyRouter.get("/getRandomEnsic", getRandomEnsiclopedies);

/**
 * @swagger
 * /ensiclopedy/update/{ensicId}:
 *   put:
 *     summary: Update an encyclopedia entry
 *     tags: [Encyclopedia]
 *     description: Update the details of a specific encyclopedia entry.
 *     parameters:
 *       - in: path
 *         name: ensicId
 *         required: true
 *         description: The ID of the encyclopedia entry to update.
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
 *                 example: "The Universe Theory"
 *               description:
 *                 type: string
 *                 example: "An updated description of the universe's structure."
 *     responses:
 *       200:
 *         description: Encyclopedia entry updated successfully.
 *       400:
 *         description: Invalid ID or data provided.
 *       500:
 *         description: Server error.
 */
ensiclopedyRouter.put("/update/:ensicId", protectRoute, updatedEnsic);

/**
 * @swagger
 * /ensiclopedy/delete/{ensicId}:
 *   delete:
 *     summary: Delete an encyclopedia entry
 *     tags: [Encyclopedia]
 *     description: Delete a specific encyclopedia entry by ID.
 *     parameters:
 *       - in: path
 *         name: ensicId
 *         required: true
 *         description: The ID of the encyclopedia entry to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Encyclopedia entry deleted successfully.
 *       400:
 *         description: Entry not found.
 *       500:
 *         description: Server error.
 */
ensiclopedyRouter.delete("/delete/:ensicId", protectRoute, deleteEnsics);

/**
 * @swagger
 * /ensiclopedy/getOne/{id}:
 *   get:
 *     summary: Get a specific encyclopedia entry by ID
 *     tags: [Encyclopedia]
 *     description: Retrieve an encyclopedia entry by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the encyclopedia entry to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The encyclopedia entry details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "607c72ef153207001f65b89"
 *                 title:
 *                   type: string
 *                   example: "Science of the Universe"
 *                 description:
 *                   type: string
 *                   example: "A detailed description of the universe's origin and structure."
 *       404:
 *         description: Encyclopedia entry not found (invalid ID).
 *       500:
 *         description: Server error.
 */
ensiclopedyRouter.get("/getOne/:id", getOneEnsic);

/**
 * @swagger
 * /ensiclopedy/getByCharacter:
 *   get:
 *     summary: Get encyclopedia entries by character
 *     tags: [Encyclopedia]
 *     description: Retrieve encyclopedia entries starting with a specific character.
 *     parameters:
 *       - in: query
 *         name: character
 *         required: true
 *         description: The character to filter the encyclopedia entries by.
 *         schema:
 *           type: string
 *           example: "S"
 *     responses:
 *       200:
 *         description: A list of encyclopedia entries starting with the specified character.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "607c72ef153207001f65b89"
 *                   title:
 *                     type: string
 *                     example: "Science of the Universe"
 *                   description:
 *                     type: string
 *                     example: "A detailed description of the universe's origin and structure."
 *       400:
 *         description: No entries found starting with the specified character.
 *       500:
 *         description: Server error.
 */
ensiclopedyRouter.get("/getByCharacter", getByCharacter);

module.exports = ensiclopedyRouter;
