function ProjectCard({title,description,link}){
    return(
        <article>
            <h3>{title}</h3>
            <p>{description}</p>
            <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            >view project</a>
        </article>
    );
}
export default ProjectCard;