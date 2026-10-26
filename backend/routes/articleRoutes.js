const express=require("express")
const{
    createArticle,
    getArticles,
    getArticlesById,
    updateArticle,
    deleteArticle,
    getAllArticlesForAdmin,
    getArticleBySlug
}=require("../controllers/articleController")

const router=express.Router();

router.post("/",createArticle);
router.get("/",getArticles);
router.get("/admin",getAllArticlesForAdmin)
router.get("/:id",getArticlesById);
router.get("/slug/:slug", getArticleBySlug);
router.put("/:id",updateArticle);
router.delete("/:id",deleteArticle);

module.exports=router;