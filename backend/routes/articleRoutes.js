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

const protectAdmin=require("../middleware/authMiddleware")

const router=express.Router();

router.post("/",protectAdmin,createArticle);
router.get("/",getArticles);
router.get("/admin",protectAdmin,getAllArticlesForAdmin)
router.get("/:id",getArticlesById);
router.get("/slug/:slug", getArticleBySlug);
router.put("/:id",protectAdmin,updateArticle);
router.delete("/:id",protectAdmin,deleteArticle);

module.exports=router;