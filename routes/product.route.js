import express from "express";
import { addProduct, getProduct } from "../controller/product.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js"; // Import admin check middleware

const productRouter = express.Router();

// 🔥 Apply authentication first, then check for admin
productRouter.post("/add", verifyAdmin, addProduct);

productRouter.get("/products", getProduct); // Get all products
productRouter.get("/products/:id", getProduct); // Get a single product by ID

export default productRouter;
