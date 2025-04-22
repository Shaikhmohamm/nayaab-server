import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Allow frontend URL
    credentials: true, // ✅ Allow sending cookies
  })
);

app.use(express.json());  // ✅ Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true }));  // ✅ Handles form data
app.use(cookieParser());

// Routes
app.use("/api", userRouter);
// routes for products
app.use("/api", productRouter)

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
