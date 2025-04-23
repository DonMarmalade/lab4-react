import {createContext, useContext, useState, useEffect} from "react";

const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const savedTheme = JSON.parse(localStorage.getItem('savedTheme')) || "light";
    const [theme, setTheme] = useState(savedTheme);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        localStorage.setItem('savedTheme', JSON.stringify(theme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    return useContext(ThemeContext);
}