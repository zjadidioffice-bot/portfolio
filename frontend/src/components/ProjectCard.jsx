function ProjectCard({title,description,link,image}){
    return(
        <article>
            {image&&(
                <img
                src={`http://localhost:3000${image}`}
                alt={title}
                style={{
                    width:"100%",
                    maxWidth:"350px",
                    height:"200px",
                    objectFit:"cover"
                }}
                />
            )}
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