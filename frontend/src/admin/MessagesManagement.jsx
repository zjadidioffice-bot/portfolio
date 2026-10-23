import { useState, useEffect } from "react";

function MessagesManagement() {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("")
    const [replyTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    async function fetchMessages() {
        try {
            const response = await fetch("http://localhost:3000/api/contact");
            if (!response.ok) {
                throw new Error("دریافت  پیام ها ناموفق بود")
            }
            const data = await response.json()
            setMessages(data)
            setError("")
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchMessages()
    }, [])
    function handleReply() {
        if (!replyTo || !replyText.trim()) {
            alert("متن پاسخ را وارد کن");
            return;
        }

        const subject = encodeURIComponent("پاسخ به پیام شما");
        const body = encodeURIComponent(replyText.trim());

        const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(replyTo.email)}&su=${subject}&body=${body}`;

        window.open(gmailUrl, "_blank", "noopener,noreferrer");
    }
    return (
        <div className="admin-messages-page">
            <h1>صندوق پیام ها</h1>
            {error && <p>{error}</p>}
            {!error && messages.length === 0 && (
                <p>هنوز پیامی دریافت نشده است...</p>
            )}
            <div className="admin-messages-grid">
                {messages.map((item) => (
                    <article className="admin-message-card" key={item._id}>
                        <h3>{item.name}</h3>
                        <p className="admin-message-email">
                            <strong> ایمیل:</strong>
                            <a href={`mailto:${item.email}`}>{item.email}</a>
                        </p>
                        <p className="admin-message-content">{item.message}</p>
                        <p className="admin-message-date">
                            تاریخ دریافت:{" "}
                            {new Date(item.createdAt).toLocaleString("fa-IR")}
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setReplyTo(item);
                                setReplyText("");
                            }}
                        >
                            پاسخ به پیام
                        </button>
                    </article>
                )
                )

                }
            </div>
            {replyTo && (
                <div className="admin-reply-form">
                    <h2>پاسخ به {replyTo.name}</h2>

                    <p>
                        ایمیل گیرنده: {replyTo.email}
                    </p>

                    <label htmlFor="replyText">متن پاسخ</label>

                    <textarea
                        id="replyText"
                        rows={5}
                        value={replyText}
                        onChange={(event) => setReplyText(event.target.value)}
                        placeholder="متن پاسخ خود را بنویس..."
                    />

                    <div className="admin-reply-actions">
                        <button type="button" onClick={handleReply}>
                            باز کردن ایمیل برای ارسال
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setReplyTo(null);
                                setReplyText("");
                            }}
                        >
                            انصراف
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MessagesManagement