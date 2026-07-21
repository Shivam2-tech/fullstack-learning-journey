import { Route, Routes } from "react-router-dom";

import GameDetails from "./pages/GameDetails";
import Home from "./pages/Home";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Layout from "./Layout/Layout";

function App() {

    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/game/:id" element={<GameDetails />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                </ Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </>

    )

}
export default App;