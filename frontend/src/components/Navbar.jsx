import {Link}from "react-router-dom"
function Navbar(){
    return(
        <nav>
            <h2>zahrajadidi</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/articles">Articles</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    );
}
export default Navbar;