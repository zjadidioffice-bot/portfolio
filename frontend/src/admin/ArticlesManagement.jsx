import { useEffect, useState } from "react";
import ArticleForm from "./ArticleForm";
function ArticlesManagement() {
    const [articles, setArticles] = useState([])
    const [articleToEdit, setArticleToEdit] = useState(null)
    const [error, setError] = useState("");


    async function fetchArticles() {
        try {
            const response = await fetch(
                "http://localhost:3000/api/articles/admin"
            );
            if (!response.ok) {
                throw new Error("دریافت مقالات ناموفق بود....")

            }
            const data = await response.json();
            setArticles(data);
            setError("")
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchArticles();
    }, []);
    function handleSave() {
        setArticleToEdit(null)
        fetchArticles()
    }
    async function handleDelete(id) {
        const confirmed = window.confirm("آیا از حذف مقاله مطمینی؟")
        if (!confirmed) { return; }
        try {
            const response = await fetch(
                `http://localhost:3000/api/articles/${id}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                throw new Error("حذف مقاله ناموفق")
            }
            setArticles((previousArticles) =>
                previousArticles.filter(
                    (article) => article._id !== id
                )
            );
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div>
            <h1>مدیریت مقالات</h1>
            <ArticleForm
                articleToEdit={articleToEdit}
                onSave={handleSave}
            />

            {error && <p>{error}</p>}
            {articles.length === 0 && !error && (
                <p>مقاله ای برای نمایش وجود ندارد</p>
            )}
            {articles.map((article) => (
                <div key={article._id}>
                    <h3>{article.title}</h3>
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
                    )
                    }

                    <p>دسته بندی:{article.category}</p>
                    <p>اسلاگ:{article.slug}</p>
                    <button onClick={() => handleDelete(article._id)}>حذف</button>
                    <button onClick={() => setArticleToEdit(article)}>ویرایش</button>
                </div>
            ))}
        </div>
    );
}

export default ArticlesManagement;