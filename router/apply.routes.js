const { Router } = require("express");

const protectRoute = require("../middleware/auth.middleware");
const {
  sendMessage,
  getMessages,
  getOneMessage,
  deleteApply,
  getByMessageSubject,
} = require("../controller/apply.controller");
const applyRouter = Router();

/**
 * @swagger
 * /apply/create:
 *   post:
 *     summary: Create a new message
 *     tags: [Message]
 *     description: Create a new message for the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - content
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "Important Update"
 *               content:
 *                 type: string
 *                 example: "This is the content of the message."
 *     responses:
 *       201:
 *         description: Message created successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 */
applyRouter.post("/create", sendMessage);

/**
 * @swagger
 * /apply/getAll:
 *   get:
 *     summary: Get all messages
 *     tags: [Message]
 *     description: Retrieve all messages in the system.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef153207001f65b89"
 *                   subject:
 *                     type: string
 *                     example: "Important Update"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the message."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-25T12:00:00Z"
 *       401:
 *         description: Unauthorized access (missing or invalid token).
 *       500:
 *         description: Server error.
 */
applyRouter.get("/getAll", protectRoute, getMessages);

/**
 * @swagger
 * /apply/get/{id}:
 *   get:
 *     summary: Get a specific message by ID
 *     tags: [Message]
 *     description: Retrieve a message by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The message details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef153207001f65b89"
 *                 subject:
 *                   type: string
 *                   example: "Important Update"
 *                 content:
 *                   type: string
 *                   example: "This is the content of the message."
 *       404:
 *         description: Message not found (invalid ID).
 *       500:
 *         description: Server error.
 */
applyRouter.get("/get/:id", getOneMessage);

/**
 * @swagger
 * /apply/delete/{id}:
 *   delete:
 *     summary: Delete a specific message
 *     tags: [Message]
 *     description: Delete a message by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *       404:
 *         description: Message not found (invalid ID).
 *       500:
 *         description: Server error.
 */
applyRouter.delete("/delete/:id", protectRoute, deleteApply);

/**
 * @swagger
 * /apply/getBySubject:
 *   get:
 *     summary: Get messages by subject
 *     tags: [Message]
 *     description: Retrieve messages by their subject.
 *     parameters:
 *       - in: query
 *         name: subject
 *         required: true
 *         description: The subject to filter messages by.
 *         schema:
 *           type: string
 *           example: "Important Update"
 *     responses:
 *       200:
 *         description: List of messages with the specified subject.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef153207001f65b89"
 *                   subject:
 *                     type: string
 *                     example: "Important Update"
 *                   content:
 *                     type: string
 *                     example: "This is the content of the message."
 *       400:
 *         description: Invalid subject provided.
 *       500:
 *         description: Server error.
 */
applyRouter.get("/getBySubject", getByMessageSubject);

module.exports = applyRouter;
