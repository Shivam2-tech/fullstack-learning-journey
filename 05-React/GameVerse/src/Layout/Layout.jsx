import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {

    const [search,setSearch]=useState("");
    const [dropDown,setDropDown]=useState("");
    const [platform,setPlatform]=useState("");

    return (
        <>
            <Navbar 
                search={search} 
                setSearch={setSearch} 
                dropDown={dropDown} 
                setDropDown={setDropDown}
                platform={platform}
                setPlatform={setPlatform}/>
            <Sidebar/>
            <Outlet context={{search,dropDown,platform}}/>
        </>
    )
}
export default Layout;