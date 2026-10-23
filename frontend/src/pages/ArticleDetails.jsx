import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify"
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
        <main className="article-details-page">
            <article className="article-details">
                <header className="article-details-header">
                    <p className="article-details-category">
                        {article.category}
                    </p>
                    <h1>{article.title}</h1>
                    {article.createdAt && (
                        <p className="article-details-date">
                            {new Date(article.createdAt).toLocaleDateString("fa-IR")}
                        </p>
                    )}
                </header>

                {article.image && (
                    <img
                        className="article-details-image"
                        src={`http://localhost:3000${article.image}`}
                        alt={article.title}

                    />
                )}
                {article.summary && (
                    <p className="article-details-summary">{article.summary}</p>
                )}
<div
    className="article-details-content"
    dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(article.content || ""),
    }}
/>
            </article>
        </main>

    )


}

export default ArticleDetails;