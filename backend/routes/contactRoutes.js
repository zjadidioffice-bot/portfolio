const express=require("express")
const{ createContact,getContacts }=require("../controllers/contactController");

const router=express.Router();
router.get("/",getContacts)
router.post("/",createContact)

module.exports=router;