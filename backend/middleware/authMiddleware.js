const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {

        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;