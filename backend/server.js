const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db")
const contactRoutes=require("./routes/contactRoutes")
const articleRoutes=require("./routes/articleRoutes");
dotenv.config();
const app=express();
const PORT=process.env.PORT||3000;

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json());
app.use("/api/contact",contactRoutes);
app.use("/api/articles",articleRoutes)
async function startServer() {
    await connectDB();
    app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    });
}
startServer();