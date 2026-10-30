import { NavLink, useNavigate } from "react-router-dom";

function AdminHeader(){
    const navigate=useNavigate();
    function handleLogout(){
        sessionStorage.removeItem("adminToken");
        navigate("/admin/login",{replace:true});
    }
    return (
<header className="admin-header">
    <h2>پنل مدیریت</h2>
    <nav>
        <NavLink to="/admin/projects">
            مدیریت پروژه ها
        </NavLink>
        <NavLink to="/admin/articles">
            مدیریت مقالات
        </NavLink>
        <NavLink to="/admin/messages">
            پیام های دریافتی
        </NavLink>
        <NavLink type="button" onClick={handleLogout}>
            خروج از حساب
        </NavLink>
    </nav>
</header>
    );
}
export default AdminHeader;