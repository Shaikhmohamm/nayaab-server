import Product from "../models/Product.model.js";

// to add the products to database
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, images, stock, isFeatured, discount } = req.body;

        // Basic validation
        if (!name || !description || !price || !category || !images || images.length === 0) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }

        // Create new product
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images,
            stock: stock || 10, // Default to 10 if not provided
            isFeatured: isFeatured || false, // Default to false if not provided
            discount: discount || 0, // Default to 0 if not provided
        });

        // Save product to database
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product added successfully!", product: savedProduct });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error. Unable to add product." });
    }
};


// Get all products or a single product by ID
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from URL params

        if (id) {
            // Fetch a single product by ID
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        }

        // If no ID is provided, fetch all products
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error. Unable to fetch product(s)." });
    }
};
