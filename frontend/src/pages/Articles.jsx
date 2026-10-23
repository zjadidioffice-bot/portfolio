import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    useEffect(() => {
        const params = new URLSearchParams();
        if (search.trim()) {
            params.set("search", search.trim())
        }
        if (category) {
            params.set("category", category);
        }
        setLoading(true);
        setError("");

        fetch(`http://localhost:3000/api/articles?${params.toString()}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("دریافت مقالات ناموفق بود");
                }
                return response.json();
            }).then((data) => setArticles(data))
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [search, category]);

    const categories = [
        ...new Set(articles.map((article) => article.category))
    ]

    // if (loading) {
    //     return <p>در حال دریافت مقالات....</p>
    // }
    // if (error) {
    //     return <p>{error}</p>
    // }
    console.log("Articles rendered");
    return (
        <main className="articles-page">
            <header className="articles-header">
                <h1>مقالات</h1>
                <p>مطالب ، تجربه ها و آموزش های من در حوزه برنامه نویسی</p>
            </header>
            <div className="articles-filters">
                <input
                    type="text"
                    placeholder="جستجوی مقاله..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">  همه دسته بندی ها</option>
                    {categories.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))
                    }
                </select>
            </div>


            {loading ? (
                <p>در حال دریافت مقالات...</p>
            ) : error ? (<p>{error}</p>) :
                articles.length === 0 ? (
                    <p>هنوز مقاله ای منتشر نشده است...</p>
                ) : (
                    <div className="articles-grid">
                        {
                            articles.map((article) =>
                                <article className="article-card"
                                    key={article._id}>
                                    <h2>
                                        <Link
                                            className="article-card-title"
                                            to={`/articles/${article._id}`}>
                                            {article.title}
                                        </Link>
                                    </h2>
                                    {article.image && (
                                        <img
                                            src={`http://localhost:3000${article.image}`}
                                            alt={article.title}
                                            className="article-card-image"
                                        />
                                    )}

                                    <p>{article.summary}</p>
                                    <p>دسته بندی:{article.category}</p>
                                <Link
                                className="article-card-button"
                                to={`/articles/${article._id}`}
                                >
                                    مشاهده مقاله
                                </Link>
                                </article>)
                        }
                    </div>
                )
            }

        </main>
    );
}

export default Articles;