const express=require("express")
const{ createContact,getContacts,saveReply }=require("../controllers/contactController");
const protectAdmin=require("../middleware/authMiddleware")
const router=express.Router();
router.get("/",protectAdmin,getContacts)
router.patch("/:id/reply", protectAdmin, saveReply);
router.post("/",createContact)

module.exports=router;