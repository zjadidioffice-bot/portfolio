const jwt = require("jsonwebtoken");

function protectAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "برای دسترسی باید وارد حساب ادمین شوی."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "اجازه دسترسی به این بخش را نداری."
            });
        }

        req.admin = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "توکن نامعتبر یا منقضی شده است. دوباره وارد شو."
        });
    }
}

module.exports = protectAdmin;