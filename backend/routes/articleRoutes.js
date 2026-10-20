const express=require("express")
const{
    createArticle,
    getArticles,
    getArticlesById,
    updateArticle,
    deleteArticle,
    getAllArticlesForAdmin
}=require("../controllers/articleController")

const router=express.Router();

router.post("/",createArticle);
router.get("/",getArticles);
router.get("/admin",getAllArticlesForAdmin)
router.get("/:id",getArticlesById);
router.put("/:id",updateArticle);
router.delete("/:id",deleteArticle);

module.exports=router;