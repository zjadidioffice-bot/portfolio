import { useState } from "react";
function About() {
    const [language, setLanguage] = useState("fa");
    return (
        <main className="about-page">
            <div className="language-switch">
                <button
                    onClick={() =>
                        setLanguage(language === "fa" ? "en" : "fa")
                    }
                >
                    {language === "fa" ? "English" : "فارسی"}
                </button>
            </div>
            <section className="about-intro">
                <p className="about-label">درباره من</p>
                <h1>
                    {language === "fa"
                        ? "سلام، من زهرا جدیدی هستم"
                        : "Hi, I'm Zahra Jadidi"}
                </h1>
                <h2>
                    {language === "fa"
                        ? "متخصص فناوری اطلاعات، توسعه‌دهنده نرم‌افزار و علاقه‌مند به هوش مصنوعی"
                        : "IT Professional, Software Developer & AI Enthusiast"}
                </h2>
                <p>
                    {language === "fa"
                        ? "فارغ‌التحصیل کارشناسی مهندسی نرم‌افزار و کارشناسی ارشد هوش مصنوعی هستم. تجربه فعالیت در مدیریت فناوری اطلاعات بیمارستان، تضمین کیفیت نرم‌افزار، تدریس دانشگاهی و توسعه وب دارم."
                        : "I hold a bachelor's degree in Software Engineering and a master's degree in Artificial Intelligence. My experience includes hospital IT management, software quality assurance, university teaching, and web development."}
                </p>

                <p>
                    {language === "fa"
                        ? "به حل مسئله، یادگیری فناوری‌های جدید و ساخت راهکارهای کاربردی علاقه‌مندم. همچنین در سال ۲۰۲۱ مجموعه آموزشی iLearn را با هدف آموزش فناوری تأسیس کردم."
                        : "I'm passionate about problem-solving, learning new technologies, and building practical solutions. In 2021, I founded iLearn, an initiative focused on technology education."}
                </p>
            </section>

            <section className="about-skills">
                <div className="section-heading">
                    <p>توانمندی های من</p>
                    <h2>مهارت ها و تخصص ها</h2>
                    <p>دانش فنی ، تجارب کاری و علاقه به یادگیری</p>
                </div>
                <div className="skills-grid">
                    <article className="skill-card">
                        <h3>توسعه وب</h3>
                        <p>JavaScript، React، Node.js، PHP، HTML و CSS</p>
                    </article>


                    <article className="skill-card">
                        <h3>پایگاه داده</h3>
                        <p>SQL Server و MongoDB</p>
                    </article>

                    <article className="skill-card">
                        <h3>تضمین کیفیت نرم‌افزار</h3>
                        <p>تحلیل کیفیت و تست API با Postman</p>
                    </article>

                    <article className="skill-card">
                        <h3>طراحی سایت و آموزش</h3>
                        <p>WordPress، Elementor و تدریس مباحث کامپیوتر</p>
                    </article>

                    <article className="skill-card">
                        <h3>برنامه‌نویسی</h3>
                        <p>C++، C# و توسعه اپلیکیشن اندروید</p>
                    </article>

                    <article className="skill-card">
                        <h3>هوش مصنوعی</h3>
                        <p>تحصیلات کارشناسی ارشد و علاقه‌مندی به راهکارهای مبتنی بر هوش مصنوعی</p>
                    </article>
                </div>

            </section>
            <section className="about-experience">
                <div className="section-heading">
                    <p>مسیر حرفه‌ای من</p>
                    <h2>سوابق کاری</h2>
                </div>

                <div className="experience-list">
                    <article className="experience-card">
                        <p className="experience-date">۱۴۰۴ تاکنون</p>
                        <h3>مدیر تضمین کیفیت</h3>
                        <p className="experience-company">
                            سازمان بیمه سلامت ایران
                        </p>
                        <p>
                            فعالیت در حوزه تحلیل و تضمین کیفیت نرم‌افزار و
                            بررسی عملکرد سامانه‌ها.
                        </p>
                    </article>

                    <article className="experience-card">
                        <p className="experience-date">۱۴۰۰ تاکنون</p>
                        <h3>توسعه‌دهنده وب‌سایت</h3>
                        <p className="experience-company">فعالیت مستقل</p>
                        <p>
                            طراحی و توسعه وب‌سایت با WordPress و ابزارهای مرتبط؛
                            همچنین فعالیت آموزشی در مجموعه iLearn.
                        </p>
                    </article>

                    <article className="experience-card">
                        <p className="experience-date">۱۴۰۲ تا ۱۴۰۴</p>
                        <h3>مدرس کامپیوتر</h3>
                        <p className="experience-company">دانشگاه سمنان</p>
                        <p>
                            تدریس مباحث کامپیوتر و برنامه‌نویسی در محیط دانشگاهی.
                        </p>
                    </article>

                    <article className="experience-card">
                        <p className="experience-date">۱۴۰۰ تا ۱۴۰۴</p>
                        <h3>مدیر فناوری اطلاعات بیمارستان</h3>
                        <p className="experience-company">بیمارستان سینا سمنان</p>
                        <p>
                            مدیریت امور فناوری اطلاعات و پیگیری عملکرد صحیح
                            سامانه‌ها و خدمات فناوری بیمارستان.
                        </p>
                    </article>
                </div>
            </section>

            <section className="about-education">
                <div className="section-heading">
                    <p>پیشینه تحصیلی</p>
                    <h2>تحصیلات</h2>
                </div>

                <div className="education-grid">
                    <article className="education-card">
                        <h3>کارشناسی ارشد هوش مصنوعی</h3>
                        <p>دانشگاه سمنان</p>
                    </article>

                    <article className="education-card">
                        <h3>کارشناسی مهندسی نرم‌افزار</h3>
                        <p>تحصیلات دانشگاهی در حوزه مهندسی نرم‌افزار</p>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default About;