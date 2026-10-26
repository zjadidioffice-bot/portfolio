const Article = require("../models/Article")

async function getArticleBySlug(req, res) {
    try {
        const article = await Article.findOne({
            slug: req.params.slug
        });

        if (!article) {
            return res.status(404).json({
                message: "مقاله پیدا نشد"
            });
        }

        res.status(200).json(article);
    } catch (error) {
        console.error("get article by slug error:", error.message);

        return res.status(500).json({
            message: "دریافت مقاله با خطای سرور مواجه شد"
        });
    }
}

async function createArticle(req, res) {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({
            message: "article created successfully",
            article
        });
    } catch (error) {
        console.log("create article error", error)

        // اسلاگ تکراری
        if (error.code === 11000) {
            return res.status(409).json({
                message: "این اسلاگ قبلاً ثبت شده است. یک اسلاگ متفاوت وارد کن."
            });
        }

        // خطای اعتبارسنجی مدل
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "اطلاعات مقاله معتبر نیست. عنوان، دسته‌بندی، متن و اسلاگ را بررسی کن."
            });
        }

        // سایر خطاهای پیش‌بینی‌نشده
        return res.status(500).json({
            message: "ذخیره مقاله با خطای سرور مواجه شد."
        });
    }
}

async function getArticles(req, res) {
    try {
        const { category, search } = req.query;

        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(
            Math.max(parseInt(req.query.limit, 10) || 6, 1),
            50
        );

        const skip = (page - 1) * limit;
        const filter = {
            published: true
        };
        if (category) {
            filter.category = category;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { summary: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }
        const totalArticles = await Article.countDocuments(filter);

        const articles = await Article.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            articles,
            currentPage: page,
            totalPages: Math.ceil(totalArticles / limit),
            totalArticles
        });

    } catch (error) {
        console.error("get articles error", error.message);
        res.status(500).json({
            message: "fail to get articles"
        })
    }
}

async function getAllArticlesForAdmin(req, res) {
    try {
        const articles = await Article.find().sort({
            createdAt: -1
        });
        res.status(200).json(articles);
    } catch (error) {
        console.log("get all articles error", error.message)

        res.status(500).json({
            message: "failed to get articles"
        });
    }
}

async function getArticlesById(req, res) {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                message: "article not found"
            })
        }
        res.status(200).json(article);
    } catch (error) {
        console.error("get article error", error.message);
        res.status(500).json({
            message: "failed to get article"
        })
    }
}
async function updateArticle(req, res) {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );
        if (!article) {
            return res.status(404).json({
                message: "article not found"
            });
        }

        res.status(200).json({
            message: "updated succeessfully",
            article
        });
    } catch (error) {
        console.error("update article error", error.message);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "این اسلاگ قبلاً برای مقاله دیگری ثبت شده است."
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "اطلاعات مقاله معتبر نیست. فیلدها را بررسی کن."
            });
        }

        return res.status(500).json({
            message: "ویرایش مقاله با خطای سرور مواجه شد."
        });
    }
}

async function deleteArticle(req, res) {
    try {
        const article = await Article.findByIdAndDelete(req.params.id)
        if (!article) {
            return res.status(404).json({
                message: "article not found"
            });
        }
        res.status(200).json({
            message: "article delete successfully"
        })
    } catch (error) {
        console.error("delete article error", error.message);
        res.status(500).json({
            message: "fail to delete article"
        })
    }
}

module.exports = {
    createArticle,
    getArticles,
    getArticlesById,
    updateArticle,
    deleteArticle,
    getAllArticlesForAdmin,
    getArticleBySlug
}