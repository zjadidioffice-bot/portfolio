import ProjectCard from "../components/ProjectCard";
import { useState, useEffect } from "react";
function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch("http://localhost:3000/api/projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("دریافت پروژه ها ناموفق بود");
                }
                return response.json();
            }).then((data) => {
                setProjects(data);
            }).catch((error) => {
                setError(error.message);
            }).finally(() => {
                setLoading(false)
            });
    }, []);
    if (loading) {
        return <p>در حال دریافت پروژه ها...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <main className="project-page">
            <header className="projects-header">
                <h1>پروژه های من</h1>
                <p>مجموعه ای از پروژه هایی که طراحی و پیاده سازی کرده ام</p>
            </header>
            {projects.length === 0 ? (
                <p className="projects-empty">هنوز پروژه ای ثبت نشده است</p>
            ) : (
                <div className="projects-grid">
                    {
                        projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                title={project.title}
                                image={project.image}
                                description={project.description}
                                demoUrl={project.demoUrl}
                            />
                        ))
                    }
                </div>

            )

            }
        </main>

    );
}

export default Projects;