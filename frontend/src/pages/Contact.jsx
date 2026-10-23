import { useState } from "react";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [isSending, setIsSending] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSending) return;
        setIsSending(true)
        setStatus("در حال ارسال پیام....")
        const formData = {
            name,
            email,
            message
        }
        try {
            const response = await fetch(
                "http://localhost:3000/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "ارسال پیام ناموفق بود...");
            }
            setStatus("پیام شما با موفقیت ارسال شد")
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error("contact form error", error)
            setStatus("ارسال پیام انجام نشد لطفا دوباره تلاش کنید")
        }
        finally {
            setIsSending(false)
        }
    }
    return (
        <main className="contact-page">
            <section className="contact-intro">
                <p className="contact-label">ارتباط با من </p>
                <h1>با من در تماس باشید</h1>
                <p>
                    اگر پیشنهادی دارید، درباره پروژه‌ای سؤال دارید
                    یا مایل به همکاری هستید، خوشحال می‌شوم پیام شما را بخوانم.
                </p>
                <section>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">نام و نام خانوادگی</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="نام خود را وارد کنید"
                                autoComplete="name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">آدرس ایمیل</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ایمیل خود را وارد کنید"
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">متن پیام</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="پیام خود را وارد کنید"
                                rows={6}
                                required
                            />
                        </div>
                        <button type="submit"
                            className="contact-submit"
                            disabled={isSending}
                        >
                            {isSending ? "در حال ارسال": "ارسال پیام" }
                        </button>
                        {status && (
                            <p className="contact-status" role="status">{status}</p>
                        )}
                    </form>
                </section>

            </section>
        </main>

    );

}

export default Contact;