
import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function RichTextEditor({ value, onChange }) {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        const host = editorRef.current;
        if (!host) return;

        // پاک‌کردن ساختار قبلی، پیش از ساخت ویرایشگر
        host.innerHTML = "";

        // ظرف اختصاصی برای Quill
        const quillContainer = document.createElement("div");
        host.appendChild(quillContainer);

        const quill = new Quill(quillContainer, {
            theme: "snow",
            placeholder: "متن مقاله را اینجا بنویس...",

modules: {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [
                { color: [] },
                { background: [] },
            ],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "blockquote"],
            [{ align: [] }],
            ["clean"],
        ],
        handlers: {
            image: function () {
                const quill = this.quill;

                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/jpeg,image/png,image/webp";

                input.click();

                input.onchange = async () => {
                    const file = input.files?.[0];

                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                        const response = await fetch(
                            "http://localhost:3000/api/uploads",
                            {
                                method: "POST",
                                body: formData,
                            }
                        );

                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(
                                data.message || "آپلود تصویر ناموفق بود"
                            );
                        }

                        const range = quill.getSelection(true);

                        quill.insertEmbed(
                            range.index,
                            "image",
                            `http://localhost:3000${data.imageUrl}`,
                            "user"
                        );

                        quill.setSelection(range.index + 1, 0);
                    } catch (error) {
                        console.error("خطای آپلود تصویر:", error);
                        alert(error.message || "آپلود تصویر ناموفق بود");
                    }
                };
            },
        },
    },
},


        });

        quillRef.current = quill;

        const handleTextChange = () => {
            onChangeRef.current(quill.root.innerHTML);
        };

        quill.on("text-change", handleTextChange);

        return () => {
            quill.off("text-change", handleTextChange);

            // حذف نوار ابزار و فضای ویرایشگر ساخته‌شده توسط Quill
            host.innerHTML = "";

            quillRef.current = null;
        };
    }, []);

    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        const newContent = value || "";

        if (quill.root.innerHTML !== newContent) {
            quill.clipboard.dangerouslyPasteHTML(newContent);
        }
    }, [value]);

    return <div ref={editorRef} />;
}

export default RichTextEditor;
