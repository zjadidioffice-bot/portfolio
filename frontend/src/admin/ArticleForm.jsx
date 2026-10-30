import { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";
import RichTextEditor from "../components/RichTextEditor";
function ArticleForm({ articleToEdit, onSave }) {
    const [formData, setFormData] = useState({
        title: articleToEdit?.title || "",
        category: articleToEdit?.category || "",
        content: articleToEdit?.content || "",
        slug: articleToEdit?.slug || "",
        image: articleToEdit?.image || "",
        published: articleToEdit?.published ?? false
    });
    const token = sessionStorage.getItem("adminToken");

    useEffect(() => {
        setFormData({
            title: articleToEdit?.title || "",
            category: articleToEdit?.category || "",
            content: articleToEdit?.content || "",
            slug: articleToEdit?.slug || "",
            image: articleToEdit?.image || "",
            published: articleToEdit?.published ?? false
        });
    }, [articleToEdit])
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function createSlug(text) {
        return text
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => {
            const updatedData = {
                ...previousData,
                [name]: value,
            };

            if (name === "title") {
                updatedData.slug = createSlug(value);
            }

            return updatedData;
        });
    }


    async function handleSubmit(event) {
        event.preventDefault();

        if (
            !formData.title.trim() ||
            !formData.category.trim() ||
            !formData.content.trim()
        ) {
            setErrorMessage("عنوان ، دسته بندی و متن مقاله را وارد کن")
            setMessage("")
            return;
        }
        setErrorMessage("")
        setMessage("")
        setIsSubmitting(true)

        try {
            const url = articleToEdit
                ?
                `http://localhost:3000/api/articles/${articleToEdit._id}`
                : "http://localhost:3000/api/articles";
            const response = await fetch(url, {
                method: articleToEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.message || "ذخیره مقاله با خطا مواجه شد")
                return;
            }
            setMessage(
                articleToEdit ?
                    "مقاله با موفقیت ویرایش شد" :
                    "مقاله با موفقیت ذخیره شد...");
            if (onSave) {
                onSave()
            }
            setFormData({
                title: "",
                category: "",
                content: "",
                slug: "",
                image: "",
                published: false
            })
        } catch (error) {
            console.error("خطای ذخیره مقاله", error)
            setErrorMessage("ارتباط با سرور برقرار نشد")
        }
        finally {
            setIsSubmitting(false)
        }


    }
    return (
        <form className="admin-article-form" onSubmit={handleSubmit}>
            <h1>ساخت مقاله</h1>
            {message && <p>{message}</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <div className="article-form-row">
                <div className="article-form-field">
                    <label htmlFor="title">عنوان مقاله</label>
                    <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="article-form-field">
                    <label htmlFor="slug"> اسلاگ:</label>
                    <input
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="article-form-row">
                <div className="article-form-field">
                    <label htmlFor="category">دسته بندی:</label>
                    <input
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="article-form-field">
                    <ImageUpload
                        value={formData.image}
                        onChange={(imageUrl) =>
                            setFormData((previousData) => ({
                                ...previousData,
                                image: imageUrl
                            }))
                        }
                    />
                </div>
            </div>


            <label htmlFor="content">متن مقاله</label>
            <RichTextEditor
                value={formData.content}
                onChange={(content) =>
                    setFormData((previousData) => ({
                        ...previousData,
                        content,
                    }))
                }
            />

            <label>
                انتشار مقاله
                <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            published: e.target.checked
                        })
                    }
                />
            </label>

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "در حال ذخیره ..." : "ذخیره مقاله"}</button>
            {/* <h3>نمایش اطلاعات:</h3>
            <p>عنوان:{formData.title}</p>
            <p>دسته بندی:{formData.category}</p>
            <p>متن:{formData.content}</p>
            <p>اسلاگ:{formData.slug}</p> */}

        </form>
    );
}

export default ArticleForm;