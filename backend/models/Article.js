const mongoose=require("mongoose");

const articleSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        slug:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
        },
        content:{
            type:String,
            required:true
        },
        summary:{
            type:String,
            default:""
        },
        published:{
            type:Boolean,
            default:false
        }
    },{
        timestamps:true
    }
);

module.exports=mongoose.model("Article",articleSchema);
