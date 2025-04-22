import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        images: [{ type: String, required: true }],
        stock: { type: Number, default: 10 },
        isFeatured: { type: Boolean, default: false },
        discount: { type: Number, default: 0 },
    },
    { timestamps: true } // Auto-creates createdAt & updatedAt fields
);

const Product = mongoose.model("Product", productSchema);
export default Product;
