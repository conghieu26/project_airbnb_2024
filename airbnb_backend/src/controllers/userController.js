const User = require("../models/user");

// GET /api/users - Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/users - Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/users - Delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users/paginate-search - Get users with pagination and search
exports.getUsersWithPaginationAndSearch = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = "" } = req.query;

    const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await User.paginate(query, options);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users/{id} - Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/users/{id} - Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users/search/{TenNguoiDung} - Search users by name
exports.searchUsersByName = async (req, res) => {
  try {
    const { TenNguoiDung } = req.params;
    const users = await User.find({
      name: { $regex: TenNguoiDung, $options: "i" },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/users/upload-avatar - Upload user avatar
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

exports.uploadAvatar = async (req, res) => {
  try {
    upload.single("avatar")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No avatar file uploaded" });
      }

      const userId = req.params.id;
      const avatarPath = `/uploads/avatars/${req.file.filename}`;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { avatar: avatarPath },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Avatar uploaded successfully", user: updatedUser });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
