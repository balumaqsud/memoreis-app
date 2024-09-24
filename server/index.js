// starting point of our application
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

//importing routes
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(cors());
dotenv.config();
// Example: Express server configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Change to your domain
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

//setting up bodyparser to send proper requests // middleweres

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// mongo db database connection
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`app is running in port ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
