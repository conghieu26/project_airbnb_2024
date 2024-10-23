import * as dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;

// Middleware
app.use(express.json());

app.get("", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});
