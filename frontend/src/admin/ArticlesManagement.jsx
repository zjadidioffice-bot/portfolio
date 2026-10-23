import { useEffect, useState, useRef } from "react";
import ArticleForm from "./ArticleForm";
function ArticlesManagement() {
    const formRef = useRef(null);
    const [articles, setArticles] = useState([])
    const [articleToEdit, setArticleToEdit] = useState(null)
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;
    const filteredArticles = articles.filter((article) => {
        const search = searchTerm.trim().toLowerCase();
        return (
            article.title?.toLowerCase().includes(search) ||
            article.slug?.toLowerCase().includes(search)
        )
    })
    const totalPages = Math.ceil(
        filteredArticles.length / articlesPerPage
    );

    const startIndex = (currentPage - 1) * articlesPerPage;

    const paginatedArticles = filteredArticles.slice(
        startIndex,
        startIndex + articlesPerPage
    );

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


            <div ref={formRef}>
                <ArticleForm
                    articleToEdit={articleToEdit}
                    onSave={handleSave}
                />
            </div>
            <div className="admin-article-search">
                <span>جستجوی مقالات</span>
                <input
                    type="search"
                    placeholder="جستجو بر اساس عنوان و یا اسلاگ"
                    value={searchTerm}
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                        setCurrentPage(1)
                    }
                    }
                />
            </div>

            {error && <p>{error}</p>}
            {articles.length === 0 && !error && (
                <p>مقاله ای برای نمایش وجود ندارد</p>
            )}
            {articles.length > 0 && filteredArticles.length === 0 && (
                <p>مقاله ای با این عبارت یافت نشد...</p>
            )

            }
            <div className="admin-articles-grid">
                {paginatedArticles.map((article) => (
                    <div className="admin-article-card" key={article._id}>
                        <div className="admin-article-info">
                            <h3 >{article.title}</h3>
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
                            <p>
                                وضعیت:{article.published ? "منتشر شده" : "پیش نویس"}
                            </p>


                        </div>
                        <div className="admin-article-actions">
                            <button onClick={() => handleDelete(article._id)}>حذف</button>
                            <button
                                onClick={() => {
                                    setArticleToEdit(article);
                                    formRef.current?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });
                                }}>


                                ویرایش
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((page) => page - 1)}
                        disabled={currentPage === 1}
                    >
                        قبلی
                    </button>

                    <span>
                        صفحه {currentPage} از {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((page) => page + 1)}
                        disabled={currentPage === totalPages}
                    >
                        بعدی
                    </button>
                </div>
            )}
        </div >
    );
}

export default ArticlesManagement;