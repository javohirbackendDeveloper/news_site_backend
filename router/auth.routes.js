const { Router } = require("express");
const {
  login,
  logout,
  refreshToken,
  checkAuth,
  register,
  updateProfile,
} = require("../controller/auth.controller");
const protectRoute = require("../middleware/auth.middleware");
const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Login a user and provide access and refresh tokens upon success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login success, tokens are provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: "605c72ef153207001f65b89"
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 accessToken:
 *                   type: string
 *                   example: "access_token_example"
 *                 refreshToken:
 *                   type: string
 *                   example: "refresh_token_example"
 *       400:
 *         description: Invalid credentials (email or password incorrect).
 *       404:
 *         description: User not found (either email or username does not exist).
 *       500:
 *         description: Server error (unexpected issues).
 */
authRouter.post("/login", login);

// /**
//  * @swagger
//  * /auth/register:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [Auth]
//  *     description: Register a new user in the system.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - username
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: user@example.com
//  *               username:
//  *                 type: string
//  *                 example: user123
//  *               password:
//  *                 type: string
//  *                 example: password123
//  *     responses:
//  *       201:
//  *         description: User successfully registered.
//  *       400:
//  *         description: Invalid input.
//  *       500:
//  *         description: Server error.
//  */
// authRouter.post("/register", register);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: Log out the user and clear the authentication cookies.
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *       500:
 *         description: Server error.
 */
authRouter.post("/logout", logout);

/**
 * @swagger
 * /auth/refreshToken:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: Refresh the access token using the refresh token.
 *     responses:
 *       200:
 *         description: Token refreshed successfully.
 *       401:
 *         description: No refresh token or invalid refresh token provided.
 *       500:
 *         description: Server error.
 */
authRouter.get("/refreshToken", refreshToken);

/**
 * @swagger
 * /auth/checkAuth:
 *   get:
 *     summary: Check authentication status
 *     tags: [Auth]
 *     description: Check the current authentication status of the user.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: "605c72ef153207001f65b89"
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       401:
 *         description: Unauthorized (user is not authenticated).
 *       500:
 *         description: Server error.
 */
authRouter.get("/checkAuth", protectRoute, checkAuth);

/**
 * @swagger
 * /auth/updateProfile/{password}:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     description: Update user profile data (only accessible by authenticated users).
 *     parameters:
 *       - in: path
 *         name: password
 *         required: true
 *         description: User's current password (for security).
 *         schema:
 *           type: string
 *           example: password123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: newuser123
 *               email:
 *                 type: string
 *                 example: newuser@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: "605c72ef153207001f65b89"
 *                 username:
 *                   type: string
 *                   example: newuser123
 *                 email:
 *                   type: string
 *                   example: newuser@example.com
 *       400:
 *         description: Invalid password.
 *       401:
 *         description: Unauthorized (user is not authenticated).
 *       500:
 *         description: Server error.
 */
authRouter.put("/updateProfile/:password", protectRoute, updateProfile);

module.exports = authRouter;
