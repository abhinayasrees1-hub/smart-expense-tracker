const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {

    const { email } = req.body;

    // 🔥 IMPORTANT: same userId everywhere
    const userId = email;

    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        token,
        user: { userId, email }
    });

});

module.exports = router;