function ProjectCard({ title, description, demoUrl, image }) {
    return (
        <article className="project-card">
            {image && (
                <img
                    src={`http://localhost:3000${image}`}
                    alt={title}

                />
            )}
            <div className="project-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >مشاهده پروژه</a>
            </div>

        </article>
    );
}
export default ProjectCard;