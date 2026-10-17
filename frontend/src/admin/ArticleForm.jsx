import { useState } from "react";

function ArticleForm() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        content: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previousData) =>
        ({
            ...previousData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        const response=await fetch(
            "http://localhost:3000/api/articles",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formData),
            }
        );
        const data=await response.json();
        if(!response.ok){
            alert(data.message||"ذخیره مقاله ناموفق بود")
            return;
        }
        alert("مقاله با موفقیت ذخیره شد...")    }
    return (
        <div>
            <h1>ساخت مقاله</h1>
            <label htmlFor="title">عنوان مقاله</label>
            <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            <label htmlFor="content">متن مقاله</label>
            <input
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
            />
            <label htmlFor="category">دسته بندی:</label>
            <input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
            />

            <h3>نمایش اطلاعات:</h3>
            <p>عنوان:{formData.title}</p>
            <p>دسته بندی:{formData.category}</p>
            <p>متن:{formData.content}</p>

        </div>
    );
}
export default ArticleForm;