const express = require("express");
const connectDB = require("./src/config/database"); // Assuming database.js is in the same directory

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
// ... your route files (e.g., require('./routes/users'))

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
