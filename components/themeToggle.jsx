"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {

    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative flex items-center justify-center w-8 h-8 rounded-full p-1 transition-colors duration-500 bg-lightBg text-darkBg"
        >
            <Sun
                className="absolute transition-all duration-500 opacity-100 rotate-0 dark:opacity-0 dark:-rotate-90"
                size={18}
            />
            <Moon
                className="absolute transition-all duration-500 opacity-0 rotate-90 dark:opacity-100 dark:rotate-0"
                size={18}
            />
        </button>
    )
}