const Project = require("../models/Project")

async function createProject(req, res) {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({
            message: "project created successfully",
            project
        });
    } catch (error) {
        console.log("create project error")
        res.status(500).json({
            message: "fail to create project"
        })
    }
}
async function getProjects(req, res) {
    try {
        const projects = await Project.find().sort({createdAt:-1});
        res.status(200).json(projects);
    } catch (error) {
        console.error("get projects error", error.message);
        res.status(500).json({
            message: "fail to get projects"
        })
    }
}

async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                message: "project not found"
            })
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("get project error", error.message);
        res.status(500).json({
            message: "failed to get project"
        })
    }
}
async function updateProject(req, res) {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );
        if (!project) {
            return res.status(404).json({
                message: "project not found"
            });
        }

        res.status(200).json({
            message: "updated succeessfully",
            project
        });
    } catch (error) {
        console.error("update project error", error.message);
        res.status(500).json({
            message: "failed to update project"
        })
    }
}

async function deleteProject(req, res) {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) {
            return res.status(404).json({
                message: "project not found"
            });
        }
        res.status(200).json({
            message: "project delete successfully"
        })
    } catch (error) {
        console.error("delete project error", error.message);
        res.status(500).json({
            message: "fail to delete project"
        })
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
}