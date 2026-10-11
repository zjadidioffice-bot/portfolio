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
        <main>
            <h1>Articles</h1>
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

            {loading ? (
                <p>در حال دریافت مقالات...</p>
            ) : error ? (<p>{error}</p>) :
                articles.length === 0 ? (
                    <p>هنوز مقاله ای منتشر نشده است...</p>
                ) : (
                    articles.map((article) =>
                        <article
                            key={article._id}>
                            <h2>
                                <Link to={`/article/${article._id}`}>
                                    {article.title}
                                </Link>
                            </h2>
                            <p>{article.summary}</p>
                            <p>دسته بندی:{article.category}</p>
                        </article>)
                )
            }

        </main>
    );
}

export default Articles;