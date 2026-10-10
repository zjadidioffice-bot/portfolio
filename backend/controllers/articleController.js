const Article = require("../models/Article")

async function createArticle(req, res) {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({
            message: "article created successfully",
            article
        });
    } catch (error) {
        console.log("create article error")
        res.status(500).json({
            message: "fail to create article"
        })
    }
}
async function getArticles(req, res) {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        console.error("get articles error", error.message);
        res.status(500).json({
            message: "fail to get articles"
        })
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
        res.status(500).json({
            message: "failed to update article"
        })
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
    deleteArticle
}