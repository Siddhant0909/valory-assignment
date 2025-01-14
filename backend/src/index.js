import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRoutes from "./routes/user.route.js";
import { connectDb } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
  connectDb();
});
