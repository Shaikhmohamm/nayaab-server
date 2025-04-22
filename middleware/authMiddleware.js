import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    console.log("Cookies received in middleware:", req.cookies); // Debugging

    const token = req.cookies.authToken; // Get token from cookies

    if (!token) {
        console.log("No auth token found in cookies.");
        return res.status(401).json({ message: "Unauthorized, no token provided", user: null });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN); // Verify JWT
        console.log("Decoded Token in Middleware:", decoded); // Debugging

        if (!decoded.userId) {
            console.log("Decoded token does not have a valid user ID:", decoded);
            return res.status(400).json({ message: "Invalid token", user: null });
        }

        // ✅ Store userId and role in `req.user`
        req.user = { id: decoded.userId, role: decoded.role }; 

        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ message: "Invalid token", user: null });
    }
};
