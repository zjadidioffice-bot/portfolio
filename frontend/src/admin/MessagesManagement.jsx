
import { useState, useEffect, useRef } from "react";

function MessagesManagement() {
    const token = sessionStorage.getItem("adminToken");

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [replyTo, setReplyTo] = useState(null);
    const [replyText, setReplyText] = useState("");

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const messagesPerPage = 6;

    const replyFormRef = useRef(null);

    // دریافت پیام‌ها از سرور
    async function fetchMessages() {
        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/contact",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("دریافت پیام‌ها ناموفق بود.");
            }

            const data = await response.json();

            setMessages(data);
            setError("");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    // با تغییر عبارت جست‌وجو، برگشت به صفحه اول
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // حرکت خودکار صفحه به سمت فرم پاسخ
    useEffect(() => {
        if (replyTo && replyFormRef.current) {
            replyFormRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [replyTo]);

    // جست‌وجو در نام، ایمیل و متن پیام
    const filteredMessages = messages.filter((item) => {
        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return true;
        }

        return (
            item.name?.toLowerCase().includes(searchText) ||
            item.email?.toLowerCase().includes(searchText) ||
            item.message?.toLowerCase().includes(searchText) ||
            item.replyText?.toLowerCase().includes(searchText)
        );
    });

    // محاسبه تعداد صفحات
    const totalPages = Math.ceil(
        filteredMessages.length / messagesPerPage
    );

    // انتخاب پیام‌های مربوط به صفحه فعلی
    const startIndex = (currentPage - 1) * messagesPerPage;

    const currentMessages = filteredMessages.slice(
        startIndex,
        startIndex + messagesPerPage
    );

    // انتخاب پیام و آماده کردن فرم پاسخ
    function selectMessage(item) {
        setReplyTo(item);
        setReplyText(item.replyText || "");
        setError("");
    }

    // ذخیره پاسخ در دیتابیس
    async function saveReply() {
        if (!replyTo || !replyText.trim()) {
            setError("متن پاسخ را وارد کن.");
            return false;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/contact/${replyTo._id}/reply`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        replyText: replyText.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "ثبت پاسخ ناموفق بود."
                );
            }

            // به‌روزرسانی پیام در لیست
            setMessages((previousMessages) =>
                previousMessages.map((item) =>
                    item._id === data.contact._id
                        ? data.contact
                        : item
                )
            );

            // به‌روزرسانی پیام انتخاب‌شده
            setReplyTo(data.contact);
            setError("");

            return true;

        } catch (error) {
            setError(error.message);
            return false;
        }
    }

    // ثبت پاسخ و باز کردن Gmail
    async function handleReply() {
        if (!replyTo || !replyText.trim()) {
            alert("متن پاسخ را وارد کن.");
            return;
        }

        const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1` +
            `&to=${encodeURIComponent(replyTo.email)}` +
            `&su=${encodeURIComponent("پاسخ به پیام شما")}` +
            `&body=${encodeURIComponent(replyText.trim())}`;

        // باز کردن پنجره قبل از درخواست سرور
        const gmailWindow = window.open("about:blank", "_blank");

        if (!gmailWindow) {
            setError("مرورگر اجازه باز کردن پنجره جدید را نداد.");
            return;
        }

        // ثبت پاسخ در دیتابیس
        const saved = await saveReply();

        if (!saved) {
            gmailWindow.close();
            return;
        }

        // انتقال پنجره به Gmail
        gmailWindow.location.href = gmailUrl;
    }

    return (
        <div className="admin-messages-page">

            <h1>صندوق پیام‌ها</h1>

            {error && (
                <p className="admin-messages-error">
                    {error}
                </p>
            )}

            {/* بخش جست‌وجو */}
            <div className="admin-messages-search">
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="جست‌وجو بر اساس نام، ایمیل یا متن پیام..."
                />
            </div>

            {/* وضعیت دریافت پیام‌ها */}
            {loading && (
                <p>در حال دریافت پیام‌ها...</p>
            )}

            {!loading && filteredMessages.length === 0 && (
                <p>
                    {search
                        ? "پیامی با این مشخصات پیدا نشد."
                        : "هنوز پیامی دریافت نشده است."}
                </p>
            )}

            {/* لیست پیام‌ها */}
            {!loading && currentMessages.length > 0 && (
                <div className="admin-messages-grid">

                    {currentMessages.map((item) => (
                        <article
                            className={`admin-message-card ${
                                replyTo?._id === item._id
                                    ? "selected"
                                    : ""
                            }`}
                            key={item._id}
                            onClick={() => selectMessage(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {
                                    event.preventDefault();
                                    selectMessage(item);
                                }
                            }}
                        >
                            <h3>{item.name}</h3>

                            <p className="admin-message-email">
                                <strong>ایمیل: </strong>
                                <a
                                    href={`mailto:${item.email}`}
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    {item.email}
                                </a>
                            </p>

                            <p className="admin-message-content">
                                {item.message}
                            </p>

                            <p className="admin-message-date">
                                تاریخ دریافت:{" "}
                                {new Date(item.createdAt).toLocaleString("fa-IR")}
                            </p>

                            <p className={`admin-message-status ${
                                item.isReplied ? "replied" : "not-replied"
                            }`}>
                                {item.isReplied
                                    ? "پاسخ داده شده"
                                    : "پاسخ داده نشده"}
                            </p>

                            {/* نمایش پاسخ ثبت‌شده */}
                            {item.isReplied && (
                                <div className="admin-message-reply">
                                    <strong>پاسخ مدیر:</strong>

                                    <p>{item.replyText}</p>

                                    <small>
                                        تاریخ پاسخ:{" "}
                                        {item.repliedAt
                                            ? new Date(item.repliedAt).toLocaleString("fa-IR")
                                            : "ثبت نشده"}
                                    </small>
                                </div>
                            )}

                            <p className="admin-message-hint">
                                برای مشاهده فرم پاسخ کلیک کن
                            </p>

                        </article>
                    ))}

                </div>
            )}

            {/* صفحه‌بندی */}
            {!loading && totalPages > 1 && (
                <div className="admin-messages-pagination">

                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((page) => page - 1)
                        }
                    >
                        قبلی
                    </button>

                    <span>
                        صفحه {currentPage} از {totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((page) => page + 1)
                        }
                    >
                        بعدی
                    </button>

                </div>
            )}

            {/* فرم پاسخ */}
            {replyTo && (
                <div
                    className="admin-reply-form"
                    ref={replyFormRef}
                >
                    <h2>پاسخ به {replyTo.name}</h2>

                    <p>
                        وضعیت:{" "}
                        {replyTo.isReplied
                            ? "پاسخ داده شده"
                            : "پاسخ داده نشده"}
                    </p>

                    <p>
                        ایمیل گیرنده: {replyTo.email}
                    </p>

                    <p>
                        پیام دریافتی: {replyTo.message}
                    </p>

                    {replyTo.isReplied && (
                        <div className="admin-reply-previous">
                            <strong>آخرین پاسخ ثبت‌شده:</strong>

                            <p>{replyTo.replyText}</p>

                            <small>
                                تاریخ پاسخ:{" "}
                                {replyTo.repliedAt
                                    ? new Date(replyTo.repliedAt).toLocaleString("fa-IR")
                                    : "ثبت نشده"}
                            </small>
                        </div>
                    )}

                    <label htmlFor="replyText">
                        متن پاسخ
                    </label>

                    <textarea
                        id="replyText"
                        rows={6}
                        value={replyText}
                        onChange={(event) =>
                            setReplyText(event.target.value)
                        }
                        placeholder="متن پاسخ خود را بنویس..."
                    />

                    <div className="admin-reply-actions">

                        <button
                            type="button"
                            onClick={handleReply}
                        >
                            باز کردن ایمیل برای ارسال
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setReplyTo(null);
                                setReplyText("");
                                setError("");
                            }}
                        >
                            انصراف
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default MessagesManagement;
