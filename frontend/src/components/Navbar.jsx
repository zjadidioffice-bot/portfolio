import {Link}from "react-router-dom"
function Navbar(){
    return(
        <nav className="navbar">
            <h2>زهرا جدیدی</h2>
            <div className="navbar-links">
                <Link to="/">خانه</Link>
                <Link to="/about">درباره من</Link>
                <Link to="/projects">پروژه ها</Link>
                <Link to="/articles">مقالات</Link>
                <Link to="/contact">تماس با من</Link>
            </div>
        </nav>
    );
}
export default Navbar;