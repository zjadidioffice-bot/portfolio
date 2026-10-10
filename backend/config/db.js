const mongoose=require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db connected suuccessfully")
    } catch (error) {
        console.error("mongo db connection failed",error.message);
        process.exit(1);
    }
}

module.exports=connectDB;