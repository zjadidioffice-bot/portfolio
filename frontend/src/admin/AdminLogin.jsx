import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "ورود ناموفق بود.");
                { error && <p role="alert">{error}</p> }
            }

            if (!data.token) {
                throw new Error("توکن ورود از سرور دریافت نشد.");
            }

            sessionStorage.setItem("adminToken", data.token);

            navigate("/admin/articles", { replace: true });

        } catch (error) {
            setError(error.message || "ارتباط با سرور برقرار نشد.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="admin-login">
            <h1>ورود مدیر سایت</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">ایمیل</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">رمز عبور</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {error && <p role="alert">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "در حال ورود..." : "ورود"}
                </button>
            </form>
        </main>
    );
}

export default AdminLogin;
