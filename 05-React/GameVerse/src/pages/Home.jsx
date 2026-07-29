import { useEffect, useRef, useState } from "react";
import Gamecard from "../components/Gamecard";
import { useOutletContext } from "react-router-dom";
import GameCardSkeleton from "../components/GameCardSkeleton";

function Home() {
    const [game, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { search, dropDown, platform } = useOutletContext();
    const loadMoreRef = useRef(null);

    // IntersectionObserver setup
    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                setPage((prev) => prev + 1);
            }
        });

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            observer.disconnect();
        };

    }, [hasMore, loading]);

    // Fetch games
    useEffect(() => {
        async function fetchGame() {
            setLoading(true);
            try {
                let url = `https://api.rawg.io/api/games?key=38dc8fd962664c0ca5924db49a096ff5&page=${page}`;
                if (search) url += `&search=${search}`;
                if (dropDown) url += `&ordering=${dropDown}`;
                if (platform) url += `&platforms=${platform}`;

                const res = await fetch(url);
                const data = await res.json();
                setHasMore(data.next !== null);
                setGames((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchGame();
    }, [search, dropDown, platform, page]);

    // Reset when filters change
    useEffect(() => {
        setGames([]);
        setPage(1);
        setHasMore(true);
    }, [search, dropDown, platform]);

    return (
        <div className="game-grid">
            {game.map((x) => (
                <Gamecard key={x.id} game={x} />
            ))}
            {hasMore && <div ref={loadMoreRef} style={{ height: "20px" }}></div>}
            {loading &&
                Array.from({ length: 6 }).map((_, index) => (
                    <GameCardSkeleton key={index} />
                ))}
        </div>
    );
}

export default Home;
