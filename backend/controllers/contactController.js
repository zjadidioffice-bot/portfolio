const Contact=require("../models/Contact");

async function createContact(req,res) {
    try {
        const{name,email,message}=req.body;
        if(!name || !email || !message){
            return res.status(400).json({
                message:"name , email , message are required"
            });
        }
        const contact=await Contact.create({
            name,
            email,
            message
        });
        res.status(201).json({
            message:"contact message saved successfully",
            contact
        });
    } catch (error) {
        console.log("create contact error",error.message);
        res.status(500).json({
            message:"failed to save contact message "
        });
    }
}
async function getContacts(req,res) {
    try {
        const contacts=await Contact.find().sort({createdAt:-1});
        res.status(200).json(contacts)
    } catch (error) {
        console.log("get contacts error",error.message)
        res.status(500).json({
            message:"failed to get contact message"
        })
    }
}
module.exports={createContact,getContacts}