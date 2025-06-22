import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import "dotenv/config";

let server: Server;
const port = 5000;

async function main() {
  try {
    await mongoose.connect(`${process.env.DB_CONNECTION_URL}`);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB with Mongoose!"
    );
    server = app.listen(port, () => {
      console.log(`Library management system running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
