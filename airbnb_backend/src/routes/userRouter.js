const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// GET /api/users - Get all users
router.get("/", UserController.getAllUsers);

// POST /api/users - Create a new user
router.post("/", UserController.createUser);

// DELETE /api/users - Delete all users
router.delete("/", UserController.deleteAllUsers);

// GET /api/users/paginate-search - Get users with pagination and search
router.get("/paginate-search", UserController.getUsersWithPaginationAndSearch);

// GET /api/users/{id} - Get user by ID
router.get("/:id", UserController.getUserById);

// PUT /api/users/{id} - Update user by ID
router.put("/:id", UserController.updateUserById);

// GET /api/users/search/{userName} - Search users by name
router.get("/search/:userName", UserController.searchUsersByName);

// POST /api/users/upload-avatar - Upload user avatar
router.post("/upload-avatar", UserController.uploadAvatar);

module.exports = router;
