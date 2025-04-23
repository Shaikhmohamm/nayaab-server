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
const allowedOrigins = [
  "http://localhost:3000",
  "https://nayaab.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
