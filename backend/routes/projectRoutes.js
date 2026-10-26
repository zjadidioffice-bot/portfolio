const express=require("express")
const{
createProject,
getProjectById,
getProjects,
updateProject,
deleteProject
}=require("../controllers/projectController")

const protectAdmin=require("../middleware/authMiddleware")

const router=express.Router();

router.post("/",protectAdmin,createProject);
router.get("/",getProjects);

router.get("/:id",getProjectById);
router.put("/:id",protectAdmin,updateProject);
router.delete("/:id",protectAdmin,deleteProject);

module.exports=router;