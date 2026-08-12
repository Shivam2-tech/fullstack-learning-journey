import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function useTheme(){
        return useContext(ThemeContext);
    }

function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    useEffect(() => {
        let saved = localStorage.getItem("theme")
        if (saved) {
            setTheme(saved)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;