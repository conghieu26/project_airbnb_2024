const express = require("express");
const connectDB = require("./src/config/database");

const app = express();

// Routes
const userRoutes = require("./src/routes/userRouter");

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
