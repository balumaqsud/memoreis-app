// starting point of our application
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

//importing routes
import postRoutes from "./routes/post.js";

const app = express();
dotenv.config();

//setting up bodyparser to send proper requests // middleweres

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

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
