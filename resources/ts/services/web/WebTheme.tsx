import { useEffect, useState } from "preact/hooks";
type ThemeMode = "light" | "dark" | "default";

function getThemeLocalStorage() {
    let themeMode: ThemeMode = "default";
    if (localStorage.getItem("theme")) {
        themeMode = localStorage.getItem("theme") as ThemeMode;
    }
    return themeMode;
}

function WebTheme() {
    const [theme, setTheme] = useState(getThemeLocalStorage());

    function changeTheme(theme: ThemeMode) {
        setTheme(theme);
    }
    function changeThemeMode(them: ThemeMode) {
        if (them === theme) return;
        if (them === "default") {
            localStorage.removeItem("theme");
            changeTheme(theme);
            return;
        }
        localStorage.setItem("theme", them);
        changeTheme(them);
    }
    function lightModeElement() {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
    }
    function darkModeElement() {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
    }

    // const themesMode: ThemeMode[] = ["dark", "light", "default"];

    useEffect(() => {
        if (theme === "light") {
            lightModeElement();
            return;
        }
        if (theme === "default") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                darkModeElement();
                return;
            }
            lightModeElement();
            return;
        }
        darkModeElement();
    }, [theme]);
    return (
        <>
            {theme === "dark" || theme === "default" ? (
                <button
                    type="button"
                    aria-label="button to light theme"
                    onClick={() => changeThemeMode("light")}
                >
                    <i class="fa-solid fa-sun text-xl  text-white" />
                </button>
            ) : (
                <button
                    type="button"
                    aria-label="button to dark theme"
                    onClick={() => changeThemeMode("dark")}
                >
                    <i class="fa-solid fa-moon text-primary " />
                </button>
            )}
        </>
    );
}

export default WebTheme;
