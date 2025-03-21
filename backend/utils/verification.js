const jwt = require("jsonwebtoken");
const User = require("../models/users/users"); 

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: "Access Denied" });
        }

     
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "Unauthorized access" });
        }
        req.user = user;
        next();

    } catch (error) {
        console.error("Error in token verification", error);
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = verifyToken;
