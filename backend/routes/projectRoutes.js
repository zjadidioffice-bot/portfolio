const express=require("express")
const{
createProject,
getProjectById,
getProjects,
updateProject,
deleteProject
}=require("../controllers/projectController")

const router=express.Router();

router.post("/",createProject);
router.get("/",getProjectById);

router.get("/:id",getProjectById);
router.put("/:id",updateProject);
router.delete("/:id",deleteProject);

module.exports=router;