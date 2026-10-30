import ProjectCard from "../components/ProjectCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
function Home() {
    const [showAll, setShowAll] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");
    const [articles, setArticles] = useState([]);
    const [articlesLoading, setArticlesLoading] = useState(true);
    const [articlesError, setArticlesError] = useState("")
    useEffect(() => {
        fetch("http://localhost:3000/api/projects")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("failed to load projects")
                }
                return response.json();
            }).then((data) => {
                setProjects(data);
            }).catch((error) => {
                setError(error.message);
            })
            .finally(() => { setLoading(false) })
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/articles")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("دریافت مقالات ناموفق بود");
                }
                return response.json();
            })
            .then((data) => {
                setArticles(data.articles);
            })
            .catch((error) => {
                setArticlesError(error.message)
            })
            .finally(() => {
                setArticlesLoading(false);
            })
    }, []);

    const featuredProjects = projects.filter((project) => project.featured);
    const visibleProjects = showAll ? projects : featuredProjects.slice(0, 2);

    const featuredArticles = articles.slice(0, 3)

    return (
        <>
<section className="hero">
    <div className="hero-layout">

        {/* عکس در سمت راست */}
        <div className="hero-image">
            <img
                src="/images/zahrajadidi.jpg"
                alt="Zahra Jadidi"
            />
        </div>

        {/* متن‌ها در سمت چپ */}
        <div className="hero-content">
            <p className="hero-greeting">
                سلام من زهرا جدیدی هستم
            </p>

            <h1>
                توسعه دهنده نرم افزار
                <br />
                و علاقه مند به هوش مصنوعی
            </h1>

            <p className="hero-description">
                در زمینه توسعه نرم افزار فعالیت میکنم
                و به ساخت برنامه های کاربردی
                و یادگیری فناوری های هوش مصنوعی علاقه مند هستم
            </p>

            <div className="hero-actions">
                <a href="/projects" className="hero-button primary">
                    مشاهده پروژه ها
                </a>

                <a href="/contact" className="hero-button primary">
                    تماس با من
                </a>
            </div>
        </div>

    </div>
</section>
            <section className="home-projects">
                <div className="section-heading">
                    <p>نمونه کارهای من</p>
                    <h2>پروژه های شاخص</h2>
                    <p>تعدادی از پروژه هایی که برای یادگیری و توصعه مهارت هایم ساخته ام</p>
                </div>
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? "نمایش کمتر" : "مشاهده همه پروژه ها"}
                </button>
                <br />
                {loading && <p>در حال دریافت پروژه ها</p>}
                {error && <p>دریافت پروژه ها ناموفق بود...:{error}</p>}
                {!loading && !error && visibleProjects.length === 0 && (
                    <p>هنوز پروژه ای برای نمایش وجود ندارد...</p>
                )}


                <div className="projects-grid">
                    {
                        visibleProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                title={project.title}
                                description={project.description}
                                demoUrl={project.demoUrl}
                                image={project.image}
                            />
                        ))

                    }
                </div>


            </section>
            <section className="home-articles">
                <div className="section-heading">
                    <p>مطالب و نوشته ها</p>
                    <h2>آخرین مقالات</h2>
                    <p>
                        مطالبی درباره تجربه ها ، یادگیری و موضوعات مورد علاقه ام
                    </p>
                </div>
                {articlesLoading && <p>در حال دریافت مقالات</p>}
                {articlesError && (
                    <p>دریافت مقالات ناموفق بود:{articlesError}</p>
                )}
                <a href="/articles">مشاهده تمام مقالات ... </a>
                {!articlesLoading && !articlesError && (

                    <div className="articles-grid">

                        {featuredArticles.map((article) => (
                            <article className="article-card" key={article._id}>
                                {article.image && (
                                    <img
                                        src={`http://localhost:3000${article.image}`}
                                        alt={article.title}
                                    />
                                )}
                                <p>{article.category}</p>
                                <h3>{article.title}</h3>
                                <p>{article.summary}</p>
                                <Link to={`/articles/${encodeURIComponent(article.slug)}`}>
                                    مطالعه  مقاله
                                </Link>
                            </article>

                        ))}
                    </div>

                )}
            </section>
            <section className="home-about">
                <div className="section-heading">
                    <p>کمی بیشتر درباره من</p>
                    <h2>علاقه مند به ساختن و یادگیری</h2>
                </div>
                <p>
                    من زهرا جدیدی هستم؛ توسعه‌دهنده نرم‌افزار و فارغ‌التحصیل
                    کارشناسی ارشد هوش مصنوعی. به ساخت برنامه‌های کاربردی،
                    حل مسئله و یادگیری فناوری‌های جدید علاقه دارم.
                </p>
                <a href="/about">
                    آشنایی بیشتر با من
                </a>
            </section>
            <section className="home-contact">
                <h2>پروژه ای در ذهن داری؟</h2>
                <p>
                    برای ارتباط ، تبادل نظر یا همکاری میتونی با من تماس بگیری...
                </p>
                <a href="/contact">تماس با من</a>
            </section>
        </>

    );
}

export default Home;