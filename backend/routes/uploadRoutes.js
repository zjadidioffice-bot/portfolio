const express=require("express")
const upload=require("../middleware/upload")
const protectAdmin=require("../middleware/authMiddleware")

const{uploadImage}=require("../controllers/uploadController")
const router=express.Router()

router.post("/",protectAdmin,upload.single("image"),uploadImage)
module.exports=router