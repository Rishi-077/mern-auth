import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
dotenv.config();

const app = express();
const port = 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect to the mongodb !!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Listening Port on ${port}!!!`);
});

app.use("/api/user", userRoutes);
