import { Route, Routes, Link } from "react-router-dom";
import Layout from "../Layout/Layout";

function Navbar({ search, setSearch, dropDown, setDropDown, platform, setPlatform }) {

    return (
        <>
            <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
            <select value={dropDown} onChange={(e) => setDropDown(e.target.value)}>
                <option value="">Default</option>
                <option value="-rating">Highest Rated</option>
                <option value="rating">Lowest Rated</option>
                <option value="-released">Newest</option>
                <option value="released">Oldest</option>
                <option value="name">A-Z</option>
                <option value="-name">Z-A</option>
            </select>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="">All Platforms</option>
                <option value="4">PC</option>
                <option value="187">PlayStation 5</option>
                <option value="18">PlayStation 4</option>
                <option value="1">Xbox One</option>
                <option value="186">Xbox Series X/S</option>
                <option value="7">Nintendo Switch</option>
                <option value="3">iOS</option>
                <option value="21">Android</option>
                <option value="5">macOS</option>
                <option value="6">Linux</option>
            </select>

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