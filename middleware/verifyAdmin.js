export const verifyAdmin = (req, res, next) => {

    console.log("Cookies received in middleware:", req.cookies); // Debugging

    const token = req.cookies.authToken; // Get token from cookies

    if (!token) {
        console.log("No auth token found in cookies.");
        return res.status(401).json({ message: "Unauthorized, no token provided", user: null });
    }
    next();
};
