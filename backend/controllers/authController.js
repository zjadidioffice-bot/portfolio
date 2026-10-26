
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "ایمیل و رمز عبور را وارد کن."
            });
        }

        if (
            !process.env.ADMIN_EMAIL ||
            !process.env.ADMIN_PASSWORD_HASH ||
            !process.env.JWT_SECRET
        ) {
            console.error("Admin login environment variables are missing.");

            return res.status(500).json({
                message: "تنظیمات ورود ادمین کامل نیست."
            });
        }

        const isEmailValid =
            email.trim().toLowerCase() ===
            process.env.ADMIN_EMAIL.trim().toLowerCase();

        const isPasswordValid = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH
        );

        if (!isEmailValid || !isPasswordValid) {
            return res.status(401).json({
                message: "ایمیل یا رمز عبور اشتباه است."
            });
        }

        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "ورود موفقیت‌آمیز بود.",
            token
        });
    } catch (error) {
        console.error("Admin login error:", error.message);

        return res.status(500).json({
            message: "ورود با خطای سرور مواجه شد."
        });
    }
}

module.exports = { loginAdmin };
