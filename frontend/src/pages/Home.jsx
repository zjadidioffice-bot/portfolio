import ProjectCard from "../components/ProjectCard";
import { useEffect, useState } from "react";
function Home() {
    const [showAll, setShowAll] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");

    useEffect(()=>{
        fetch("http://localhost:3000/api/projects")
        .then((response)=>{
            if(!response.ok){
                throw new Error("failed to load projects")
            }
            return response.json();
        }).then((data)=>{
            setProjects(data);
        }).catch((error)=>{
            setError(error.message);
        })
        .finally(()=>{setLoading(false)})
    },[]);

    const featuredProjects=projects.filter((project)=>project.featured);
    const visibleProjects=showAll?projects:featuredProjects.slice(0,2);

    return (
        <>
            <section>
                <h1>welcome to my portfolio</h1>
                <p>
                    I'm Zahra Jadidi, an AI master's graduate and software developer.
                </p>
            </section>
            <section>
                <h2>featured projects</h2>
                <button onClick={() => setShowAll(!showAll)}>
                   {showAll?"show less":"Show More"} 
                </button>
                <p>
                    {showAll ? "Showing all projects" : "Showing featured projects"}
                </p>
                {

                    visibleProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            link={project.link}
                        />
                    ))
                }
            </section>
        </>

    );
}

export default Home;