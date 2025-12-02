import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "fr";

type TabsT = {
  all: string;
  course: string;
  td: string;
  tp: string;
  tdSolutions: string;
  tpSolutions: string;
};

type Translations = {
  moduleNames: Record<string, string>;
  accessText: string;
  noResourcesTitle: string;
  noResourcesDesc: string;
  tabs: TabsT;
  seriesLabel: string;
  module?: string;
};

const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    moduleNames: {
      algo: "Algorithms and Data Structures 3",
      "archi-ord": "Computer Architecture",
      thg: "Graph Theory",
      english: "English",
      si: "Information Systems",
      "method-num": "Numerical Methods",
      logique: "Logic",
    },
    accessText: "Access all course materials, TDs and TPs files",
    noResourcesTitle: "No Resources Yet",
    noResourcesDesc: "Resources are hosted on Google Drive.",
    tabs: {
      all: "All",
      course: "Courses",
      td: "TD",
      tp: "TP",
      tdSolutions: "TD Solutions",
      tpSolutions: "TP Solutions",
    },
    seriesLabel: "Series",
  },
  fr: {
    moduleNames: {
      algo: "Algorithmes et Structures de Données 3",
      "archi-ord": "Architecture des Ordinateurs",
      thg: "Théorie des Graphes",
      english: "Anglais",
      si: "Systèmes d'Information",
      "method-num": "Méthodes Numériques",
      logique: "Logique",
    },
    accessText: "Accédez à tous les documents de cours, TD et TP",
    noResourcesTitle: "Aucune ressource pour l'instant",
    noResourcesDesc: "Les ressources sont hébergées sur Google Drive.",
    tabs: {
      all: "Tous",
      course: "Cours",
      td: "TD",
      tp: "TP",
      tdSolutions: "Solutions TD",
      tpSolutions: "Solutions TP",
    },
    seriesLabel: "Série",
  },
};

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LangContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const raw = localStorage.getItem("lang");
      if (raw === "en" || raw === "fr") return raw as Lang;
    } catch (e) {
      // fallback to navigator
      if (import.meta.env.DEV) {
        console.warn("LanguageContext: failed to read localStorage", e);
      }
    }
    const nav = typeof navigator !== "undefined" ? navigator.language : "en";
    return nav && nav.startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn("LanguageContext: failed to write localStorage", e);
      }
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: TRANSLATIONS[lang] }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export default LanguageContext;
