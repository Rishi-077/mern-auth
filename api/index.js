import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect to the mongodb !!!");
  })
  .catch((err) => {
    console.log("Rishi", err, process.env.MONGO);
  });
  
const port = 3000;
app.listen(port, () => {
  console.log(`Listening Port on ${port}!!!`);
});
