import dotenv from "dotenv";
import db from "./db";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();
const PORT = process.env.PORT || 4001;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
