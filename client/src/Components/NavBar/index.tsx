import "./styles.css"
import {useNavigate} from "react-router-dom";
import { BiSolidMoviePlay } from "react-icons/bi";
const NavBar = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    return (
        <div className="nav-bar">
            <div className={"movie-catalog-container"} onClick={goHome}>
                <BiSolidMoviePlay className={"movie-icon"}/>
                <div className={"movie-text"}>Movie Catalog</div>
            </div>
        </div>
    )
}

export default NavBar