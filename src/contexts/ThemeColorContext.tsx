import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "red" | "blue";

interface ThemeColorContextType {
    themeColor: ThemeColor;
    setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
    const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
        // Check local storage for persisted theme preference
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme-color");
            return (saved as ThemeColor) || "red";
        }
        return "red";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("data-theme", themeColor);
        localStorage.setItem("theme-color", themeColor);
    }, [themeColor]);

    return (
        <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeColorContext.Provider>
    );
}

export function useThemeColor() {
    const context = useContext(ThemeColorContext);
    if (context === undefined) {
        throw new Error("useThemeColor must be used within a ThemeColorProvider");
    }
    return context;
}
