import { useEffect, useState, useRef } from "react";
import ProjectForm from "./ProjectForm";
function ProjectManagement() {
    const formRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [error, setError] = useState("");
    const token = sessionStorage.getItem("adminToken");


    async function fetchProjects() {
        try {
            const response = await fetch(
                "http://localhost:3000/api/projects"
            );
            if (!response.ok) {
                throw new Error("دریافت پروژه ناموفق بود....")

            }
            const data = await response.json();
            setProjects(data);
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
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (!response.ok) {
                throw new Error("حذف پروژه ناموفق")
            }
            setProjects((previousProjects) =>
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
            <div ref={formRef}>
                <ProjectForm
                    projectToEdit={projectToEdit}
                    onSave={handleSave}
                />
            </div>


            {error && <p>{error}</p>}
            {projects.length === 0 && !error && (
                <p>پروژه ای برای نمایش وجود ندارد</p>
            )}
            <div className="admin-projects-grid">
                {projects.map((project) => (
                    <div className="admin-project-card" key={project._id}>
                        <h3>{project.title}</h3>
                        {project.image && (
                            <img
                                src={`http://localhost:3000${project.image}`}
                                alt={project.title}
                                style={{
                                    width: "180px",
                                    height: "120px",
                                    objectFit: "cover"
                                }}
                            />
                        )}
                        <p>توضیحات:{project.description}</p>
                        <div className="admin-project-actions">
                            <button onClick={() => handleDelete(project._id)}>حذف</button>
                            <button onClick={() => {
                                setProjectToEdit(project)
                                formRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                })
                            }}

                            >ویرایش</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectManagement;