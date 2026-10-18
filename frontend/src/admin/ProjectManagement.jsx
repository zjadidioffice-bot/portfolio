import { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
function ProjectManagement() {
    const [projects, setprojects] = useState([]);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [error, setError] = useState("");


    async function fetchProjects() {
        try {
            const response = await fetch(
                "http://localhost:3000/api/projects"
            );
            if (!response.ok) {
                throw new Error("دریافت پروژه ناموفق بود....")

            }
            const data = await response.json();
            setArticles(data);
            setError("")
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);
    function handleSave() {
        setProjectToEdit(null)
        fetchProjects()
    }
    async function handleDelete(id) {
        const confirmed = window.confirm("آیا از حذف پروژه مطمینی؟")
        if (!confirmed) { return; }
        try {
            const response = await fetch(
                `http://localhost:3000/api/projects/${id}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                throw new Error("حذف پروژه ناموفق")
            }
            setArticles((previousProjects) =>
                previousProjects.filter(
                    (project) => project._id !== id
                )
            );
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div>
            <h1>مدیریت پروژه ها</h1>
            <ProjectForm
                projectToEdit={projectToEdit}
                onSave={handleSave}
            />

            {error && <p>{error}</p>}
            {projects.length === 0 && !error && (
                <p>پروژه ای برای نمایش وجود ندارد</p>
            )}
            {projects.map((project) => (
                <div key={project._id}>
                    <h3>{project.title}</h3>
                    <p>دسته بندی:{project.description}</p>
                    <button onClick={() => handleDelete(project._id)}>حذف</button>
                    <button onClick={() => setArticleToEdit(project)}>ویرایش</button>
                </div>
            ))}
        </div>
    );
}

export default ProjectManagement;