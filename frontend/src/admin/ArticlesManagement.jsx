import { useEffect, useState } from "react";

function ArticlesManagement() {
    const [articles, setArticles] = useState([])
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/articles"
                );
                if (!response.ok) {
                    throw new Error("دریافت مقالات ناموفق بود....")

                }
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                setError(error.message)
            }
        }
        fetchArticles();
    }, []);

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
            {error && <p>{error}</p>}
            {articles.length === 0 && !error && (
                <p>مقاله ای برای نمایش وجود ندارد</p>
            )}
            {articles.map((article) => (
                <div key={article._id}>
                    <h3>{article.title}</h3>
                    <p>دسته بندی:{article.category}</p>
                    <p>اسلاگ:{article.slug}</p>
                    <button onClick={()=>handleDelete(article._id)}>حذف</button>
                </div>
            ))}
        </div>
    );
}

export default ArticlesManagement;