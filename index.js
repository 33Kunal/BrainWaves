import authRoutes from "./Routes/auths.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import tweetRoutes from "./Routes/tweets.js";
import userRoutes from "./Routes/users.js";

const PORT = process.env.PORT || 8000;

const app = express();
dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO) 
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);



app.listen(PORT, () => {
  connect();
  console.log(`Listening to port ${PORT}`);
});