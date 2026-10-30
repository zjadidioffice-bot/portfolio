const mongoose=require("mongoose")

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    isReplied:{
        type:Boolean,
        default:false
    },
    replyText:{
        type:String,
        trim:true,
        default:""
    },
    repliedAt:{
        type:Date,
        default:null
    }

},
{
    timestamps:true
});
module.exports=mongoose.model("Contact",contactSchema);

