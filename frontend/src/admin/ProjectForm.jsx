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
    const token = sessionStorage.getItem("adminToken");

    useEffect(() => {
        setFormData({
            title: projectToEdit?.title || "",
            description: projectToEdit?.description || "",
            image: projectToEdit?.image || "",
            demoUrl: projectToEdit?.demoUrl || "",
            featured: projectToEdit?.featured ?? false

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
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
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
        <form className="admin-project-form" onSubmit={handleSubmit}>
            <h2>
                {projectToEdit ? "ساخت پروژه" : "ویرایش پروژه"}
            </h2>
            <div>
                <div className="project-form-field">
                    <label htmlFor="title">عنوان پروژه</label>
                    <input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="project-form-field">
                    <label htmlFor="demoUrl">لینک اجرا پروژه</label>
                    <input
                        id="demoUrl"
                        name="demoUrl"
                        value={formData.demoUrl}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <label htmlFor="description">توضیحات پروژه</label>
            <input
                id="description"
                name="description"
                value={formData.description}
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

            <label htmlFor="featured">پروژه ویژه است؟
                <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">
                {projectToEdit ? "ذخیره تغیرات" : "ثبت پروژه"}
            </button>
        </form>
    );
}
export default ProjectForm;