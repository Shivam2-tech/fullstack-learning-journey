import { Route, Routes, Link } from "react-router-dom";

function Navbar() {

    return (
        <>
            <Link to="/library">
                Library
            </Link>

            <Link to="/">
                Home
            </Link>

            <Link to="/wishlist">
                Wishlist
            </Link>
        </>

    )
}

export default Navbar;