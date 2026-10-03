import ProjectCard from "../components/ProjectCard";
import { useState } from "react";
function Home() {
    const [showAll, setShowAll] = useState(false);

    const projects = [
        {
            id: 1,
            title: "todo app",
            description: "A full-stack todo application built with React, Node.js and MongoDB.",
            link: "https://todo.zahrajadidi.ir"
        },
        {
            id: 2,
            title: "chat app",
            description: "A real-time chat application built with React and Node.js.",
            link: "https://chat.zahrajadidi.ir"
        },
                {
            id: 3,
            title: "blog app",
            description: "A real-time chat application built with React and Node.js.",
            link: "https://chat.zahrajadidi.ir"
        },
                {
            id: 4,
            title: "resume app",
            description: "A real-time chat application built with React and Node.js.",
            link: "https://chat.zahrajadidi.ir"
        }
    ]
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

                    projects.slice(0,showAll?projects.length:2)
                    .map((project) => (
                        <ProjectCard
                            key={project._id}
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