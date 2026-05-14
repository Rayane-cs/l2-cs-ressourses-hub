import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export type ThemeColor = "pink" | "red" | "blue" | "green" | "purple";

/** Default palette when no saved preference — profile `theme_color` still wins when set. */
export const DEFAULT_THEME_COLOR: ThemeColor = "purple";

const VALID_THEME_COLORS: ThemeColor[] = ["pink", "red", "blue", "green", "purple"];

interface ThemeColorContextType {
    themeColor: ThemeColor;
    setThemeColor: (color: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
    const { profile, updateProfile } = useAuth();
    const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
        // Check local storage for persisted theme preference
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme-color");
            return VALID_THEME_COLORS.includes(saved as ThemeColor) ? (saved as ThemeColor) : DEFAULT_THEME_COLOR;
        }
        return DEFAULT_THEME_COLOR;
    });

    const prevProfileIdRef = React.useRef<string | null>(null);

    // Sync with profile when it loads or user changes
    useEffect(() => {
        if (profile?.id && profile.id !== prevProfileIdRef.current) {
            prevProfileIdRef.current = profile.id;
            if (profile.theme_color && VALID_THEME_COLORS.includes(profile.theme_color as ThemeColor)) {
                setThemeColor(profile.theme_color as ThemeColor);
            }
        } else if (!profile) {
            prevProfileIdRef.current = null;
        }
    }, [profile]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("data-theme", themeColor);
        localStorage.setItem("theme-color", themeColor);
        
        // Only sync TO the database if we are logged in AND 
        // the profile's theme is actually different from our current state.
        if (profile && profile.theme_color !== themeColor) {
            updateProfile({ theme_color: themeColor });
        }
    }, [themeColor, profile?.id, updateProfile]);

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
