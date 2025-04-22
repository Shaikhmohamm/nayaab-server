import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // Default role is 'user'
    },
    isAdmin: { type: Boolean, default: false }, // Kept for backward compatibility
    isVerified: { type: Boolean, default: true }, // Default: Verified for normal users
  },
  { timestamps: true }
);

// Middleware to keep isAdmin in sync with role
userSchema.pre("save", function (next) {
  this.isAdmin = this.role === "admin";
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
