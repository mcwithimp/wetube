import db from "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(4000, handleListening);
