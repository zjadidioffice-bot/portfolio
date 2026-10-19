import { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";
function ProjectForm({ projectToEdit, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        demoUrl: "",
        featured: false
    });

    useEffect(() => {
        setFormData({
            title: projectToEdit?.title || "",
            description: projectToEdit?.description || "",
            image: projectToEdit?.image || "",
            demoUrl: projectToEdit?.demoUrl || "",
            featured: projectToEdit?.featured || ""

        });
    }, [projectToEdit])

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setFormData((previousData) =>
        (
            {
                ...previousData,
                [name]: type === "checkbox" ? checked : value
            }
        ));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            alert("عنوان و توضیحات پروژه الزامی است")
            return;
        }
        const url = projectToEdit
            ? `http://localhost:3000/api/projects/${projectToEdit._id}`
            : "http://localhost:3000/api/projects";
        const method = projectToEdit ? "PUT" : "POST"
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("ذخیره پروژه ناموفق بود...")
            }
            alert("پروژه با موفقیت ذخیره شد")
            setFormData({
                title: "",
                description: "",
                image: "",
                demoUrl: "",
                featured: false
            });
            if (onSave) {
                onSave();
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>
                {projectToEdit ? "ساخت پروژه" : "ویرایش پروژه"}
            </h2>
            <label htmlFor="title">عنوان پروژه</label>
            <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="description">توضیحات پروژه</label>
            <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            <br />

            <label htmlFor="demoUrl">لینک اجرا پروژه</label>
            <input
                id="demoUrl"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
            />
            <ImageUpload
                value={formData.image}
                onChange={(imageUrl) =>
                    setFormData((previousData) => ({
                        ...previousData,
                        image: imageUrl
                    }))
                }
            />
            {/* <label htmlFor="title">آدرس تصویر</label>
            <input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
            /> */}
            <label htmlFor="title">پروژه ویژه است؟</label>
            <input
                type="checkbox"
                name="featured"
                value={formData.featured}
                onChange={handleChange}
            />
            <button type="submit">
                {projectToEdit ? "ثبت پروژه" : "ذخیره تغیرات"}
            </button>
        </form>
    );
}
export default ProjectForm;