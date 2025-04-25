import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const registerUser = async (req, res) => {
    try {
      const { fullName, email, mobile, password, role } = req.body;
  
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Set default role if not provided
      const assignedRole = role || "user";
  
      // Create user with isVerified = false for admins
      const userData = {
        fullName,
        email,
        mobile,
        password: hashedPassword,
        role: assignedRole,
        isVerified: assignedRole === "admin" ? false : true, // Admins require manual approval
      };
  
      const user = new User(userData);
      await user.save();
  
      res.status(201).json({
        message:
          assignedRole === "admin"
            ? "Admin registered successfully. Approval required."
            : "User registered successfully",
      });
  
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Server error, please try again later", error: error.message });
    }
  };
  
  
  export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ Include `role` in the token payload
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.SECRET_TOKEN,
            { expiresIn: "1h" }
        );

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // true in production
          sameSite: "None", // ❗ Allow cross-site requests
          maxAge: 60 * 60 * 1000, // Optional: 1 hour in milliseconds
        });

        res.status(200).json({ message: "Login successful!", user: { id: user._id, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
  


export const getUserProfile = async (req, res) => {
    try {
        console.log("User in Request Object:", req.user); // Debugging

        if (!req.user || !req.user.id) {
            console.log("No user found in request object.");
            return res.status(401).json({ message: "Unauthorized", user: null });
        }

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            console.log("User not found in DB for ID:", req.user.id);
            return res.status(404).json({ message: "User not found", user: null });
        }

        console.log("User Found:", user); // Debugging
        res.json({ user });
    } catch (error) {
        console.error("Error in getUserProfile:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



export const logout = (req, res) => {
    try {
      // Clear the auth token cookie
      res.clearCookie("authToken", {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "None",
      });
  
      // Send success response
      res.status(200).json({
        success: true,
        message: "Logged out successfully!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Logout failed. Please try again!",
      });
    }
  };
  
  
  
  