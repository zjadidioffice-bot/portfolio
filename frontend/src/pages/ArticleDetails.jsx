import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArticleDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        setLoading(true);
        setError("");

        fetch(`http://localhost:3000/api/articles/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("دریافت مقالات ناموفق بود");
                }
                return response.json();
            }).then((data) => setArticle(data))
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [id]);
    if (loading) {
        return <p>در حال دریافت مقالات....</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (!article) {
        return <p>{error}</p>
    }
    return (
        <article>
            <h1>{article.title}</h1>

            <p>دسته بندی:{article.category}</p>
            {article.image && (
                <img
                    src={`http://localhost:3000${article.image}`}
                    alt={article.title}
                    style={{
                        width: "100%",
                        maxWidth: "350px",
                        height: "200px",
                        objectFit: "cover"
                    }}
                />
            )}
            <p>{article.summary}</p>
            <div>
                {article.content}
            </div>
        </article>
    )


}

export default ArticleDetails;