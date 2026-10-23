import { useState,useEffect } from "react";

function ImageUpload({ value, onChange }) {
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    
    useEffect(() => {
    if (!value) {
        setPreview("");
    }
}, [value]);

    async function handleUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await fetch(
                "http://localhost:3000/api/uploads",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "آپلود تصویر ناموفق بود."
                );
            }

            onChange(data.imageUrl);
        } catch (error) {
            setError(error.message);
            setPreview("");
        } finally {
            setLoading(false);
        }
        
    }
    const imageSrc = preview ||
            (value ? `http://localhost:3000${value}` : "");

    return (
        <div>
            <label htmlFor="image-upload">انتخاب تصویر</label>

            <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUpload}
            />

            {loading && <p>در حال آپلود تصویر...</p>}
            {error && <p>{error}</p>}

            {imageSrc && (
                <img
                    src={imageSrc}
                    alt="پیش‌نمایش تصویر"
                    style={{
                        width: "180px",
                        height: "120px",
                        objectFit: "cover"
                    }}
                />
            )}
        </div>
    );
}
export default ImageUpload;