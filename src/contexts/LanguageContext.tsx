import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "fr";

type TabsT = {
  all: string;
  course: string;
  td: string;
  tp: string;
  tdSolutions: string;
  tpSolutions: string;
  exam: string;
  examSolutions: string;
};

type Translations = {
  moduleNames: Record<string, string>;
  accessText: string;
  noResourcesTitle: string;
  noResourcesDesc: string;
  tabs: TabsT;
  seriesLabel: string;
  module?: string;
  // Header
  nav: {
    home: string;
    years: string;
    about: string;
    search: string;
    feedback: string;
    more: string;
    comingSoon: string;
    switchLanguage: string;
  };
  // Footer
  footer: {
    quickLinks: string;
    academicYears: string;
    programmingLangs: string;
    connectWithUs: string;
    copyright: string;
    firstYear: string;
    secondYear: string;
    thirdYear: string;
    masterYear1: string;
    masterYear2: string;
  };
  // Hero
  hero: {
    title: string;
    subtitle: string;
    exploreNow: string;
    announcementTitle: string;
    announcementDesc: string;
    courses: string;
    codes: string;
  };
  // YearSections
  years: {
    licence: string;
    master: string;
    firstYear: string;
    secondYear: string;
    thirdYear: string;
    masterYear1: string;
    masterYear2: string;
  };
  // About
    about: {
      title: string;
      subtitle: string;
      comprehensiveResources: string;
      comprehensiveResourcesDesc: string;
      organizedByModule: string;
      organizedByModuleDesc: string;
      programmingLanguage: string;
      programmingLanguageDesc: string;
      missionTitle: string;
      missionText: string;
      advancedSearch: string;
      advancedSearchDesc: string;
      multipleResourceTypes: string;
      multipleResourceTypesDesc: string;
      bilingualSupport: string;
      bilingualSupportDesc: string;
    };
  // Search
  search: {
    title: string;
    subtitle: string;
    placeholder: string;
    type: string;
    module: string;
    semester: string;
    allTypes: string;
    allModules: string;
    allSemesters: string;
    found: string;
    results: string;
    result: string;
    noResults: string;
    noResultsDesc: string;
    startSearching: string;
    startSearchingDesc: string;
    open: string;
    problem: string;
  };
  // Feedback
  feedback: {
    title: string;
    subtitle: string;
    thankYou: string;
    thankYouDesc: string;
    goToHome: string;
    yourName: string;
    yourNameDesc: string;
    enterName: string;
    usefulness: string;
    usefulnessDesc: string;
    excellent: string;
    veryGood: string;
    good: string;
    fair: string;
    poor: string;
    filePreference: string;
    filePreferenceDesc: string;
    includePdfs: string;
    keepDriveLinks: string;
    bothPdfsAndLinks: string;
    noPreference: string;
    themeLiked: string;
    themeLikedDesc: string;
    yes: string;
    no: string;
    themeSuggestions: string;
    themeSuggestionsDesc: string;
    themeSuggestionsPlaceholder: string;
    futureFeatures: string;
    futureFeaturesDesc: string;
    futureFeaturesPlaceholder: string;
    characters: string;
    skip: string;
    submitFeedback: string;
    submitting: string;
  };
  // NotFound
  notFound: {
    title: string;
    message: string;
    returnHome: string;
  };
  // ModulePage
  modulePage: {
    back: string;
    other: string;
    ytVideos: string;
    books: string;
    resumes: string;
    scrollLeft: string;
    scrollRight: string;
  };
  // YearPage
  yearPage: {
    backToYears: string;
    yearNotFound: string;
    backToHome: string;
    resourcesComingSoon: string;
    s3Modules: string;
    s4Modules: string;
    programmingLanguages: string;
  };
  // Intro
  intro: {
    title: string;
    subtitle: string;
  };
};

const TRANSLATIONS: Record<Lang, Translations> = {
  en: {
    moduleNames: {
      algo: "Algorithms and Data Structures 3",
      "archi-ord": "Computer Architecture",
      thg: "Graph Theory",
      english: "English",
      "english-s4": "English",
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
      exam: "Exams",
      examSolutions: "Exams solution",
    },
    seriesLabel: "Series",
    nav: {
      home: "Home",
      years: "Years",
      about: "About",
      search: "Search",
      feedback: "Feedback",
      more: "More",
      comingSoon: "Coming soon",
      switchLanguage: "Switch language",
    },
    footer: {
      quickLinks: "Quick Links",
      academicYears: "Academic Years",
      programmingLangs: "Programming Langs",
      connectWithUs: "Connect With Us",
      copyright: "Copyright",
      firstYear: "L1 - First Year",
      secondYear: "L2 - Second Year",
      thirdYear: "L3 - Third Year",
      masterYear1: "M1 - Master Year 1",
      masterYear2: "M2 - Master Year 2",
    },
    hero: {
      title: "UHBC CS Student Hub",
      subtitle: "Organized CS resources by academic year (L1→M2): courses, TDs, TPs, and code",
      exploreNow: "Explore Now",
      announcementTitle: "🎉 New Feature Available!",
      announcementDesc: "Our powerful search feature is now live! Find courses, TDs, TPs, and code files across all modules instantly.",
      courses: "Courses",
      codes: "Codes",
    },
    years: {
      licence: "Licence",
      master: "Master",
      firstYear: "First Year",
      secondYear: "Second Year",
      thirdYear: "Third Year",
      masterYear1: "Master Year 1",
      masterYear2: "Master Year 2",
    },
    about: {
      title: "About UHBC CS Platform",
      subtitle: "A modern, student-friendly platform designed to help UHBC L2 Computer Science students access all their academic resources efficiently.",
      comprehensiveResources: "Comprehensive Resources",
      comprehensiveResourcesDesc: "Access all course materials, TDs, TPs, and code files in one centralized platform.",
      organizedByModule: "Organized by Module",
      organizedByModuleDesc: "Easily navigate through 7 different modules with intuitive categorization.",
      programmingLanguage: "Programming Languages",
      programmingLanguageDesc: "Explore programming resources for C, Python, Java, and Assembly languages with practical exercises and examples.",
      missionTitle: "Our Mission",
      missionText: "We believe in empowering students through accessible education. This platform was created to centralize all academic resources for UHBC L2 Computer Science students, making it easier to find materials, collaborate with peers, and succeed in your studies. With features like organized module pages, advanced search and secure file management via Google Drive, we're committed to enhancing your learning experience.",
      advancedSearch: "Advanced Search",
      advancedSearchDesc: "Quickly find any resource across all modules with our powerful search functionality.",
      multipleResourceTypes: "Multiple Resource Types",
      multipleResourceTypesDesc: "Access courses, TDs, TPs, exams, solutions, YouTube videos, books, and more in one place.",
      bilingualSupport: "Bilingual Support",
      bilingualSupportDesc: "Full support for both French and English languages throughout the entire platform.",
    },
    search: {
      title: "Search Resources",
      subtitle: "Find courses, TDs, TPs, and code files across all modules",
      placeholder: "Search by title, keyword...",
      type: "Type",
      module: "Module",
      semester: "Semester",
      allTypes: "All Types",
      allModules: "All Modules",
      allSemesters: "All Semesters",
      found: "Found",
      results: "results",
      result: "result",
      noResults: "No Results Found",
      noResultsDesc: "Try adjusting your filters or search term",
      startSearching: "Start Searching",
      startSearchingDesc: "Enter a search term or use filters to find resources",
      open: "Open",
      problem: "Problem:",
    },
    feedback: {
      title: "Your Feedback Matters",
      subtitle: "Help us improve by sharing your thoughts. This will only appear once per device.",
      thankYou: "Thank You!",
      thankYouDesc: "We appreciate your feedback and will use it to improve our website.",
      goToHome: "Go to Home",
      yourName: "Your Name",
      yourNameDesc: "Please enter your name",
      enterName: "Enter your name",
      usefulness: "Do you find this website useful?",
      usefulnessDesc: "Rate your experience from Poor to Excellent",
      excellent: "Excellent - So much useful",
      veryGood: "Very Good - Very useful",
      good: "Good - Useful",
      fair: "Fair - Somewhat useful",
      poor: "Poor - Not very useful",
      filePreference: "How should files be included?",
      filePreferenceDesc: "Should resources be included as PDFs or keep the Drive links?",
      includePdfs: "Include files as PDFs",
      keepDriveLinks: "Keep Drive links (current approach)",
      bothPdfsAndLinks: "Both PDFs and Drive links",
      noPreference: "No preference",
      themeLiked: "Do you like the color theme?",
      themeLikedDesc: "Your opinion about the current color scheme",
      yes: "Yes, I like it",
      no: "No, I don't like it",
      themeSuggestions: "Color Theme Suggestions",
      themeSuggestionsDesc: "What changes would you like to see in the color theme?",
      themeSuggestionsPlaceholder: "Share your color theme suggestions...",
      futureFeatures: "What would you like to see in the future?",
      futureFeaturesDesc: "Share any features, improvements, or ideas you'd like to see on this website.",
      futureFeaturesPlaceholder: "Tell us what features you'd like to see...",
      characters: "characters",
      skip: "Skip",
      submitFeedback: "Submit Feedback",
      submitting: "Submitting...",
    },
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      returnHome: "Return to Home",
    },
    modulePage: {
      back: "Back",
      other: "Other",
      ytVideos: "YT Videos",
      books: "Books",
      resumes: "Resumes",
      scrollLeft: "Scroll left",
      scrollRight: "Scroll right",
    },
    yearPage: {
      backToYears: "Back to Years",
      yearNotFound: "Year Not Found",
      backToHome: "Back to Home",
      resourcesComingSoon: "Resources for {year} will be available soon. Currently organizing content...",
      s3Modules: "S3 Modules",
      s4Modules: "S4 Modules",
      programmingLanguages: "Programming Languages",
    },
    intro: {
      title: "UHBC CS Resources",
      subtitle: "Organized, fast, and student-focused — loading…",
    },
  },
  fr: {
    moduleNames: {
      algo: "Algorithmes et Structures de Données 3",
      "archi-ord": "Architecture des Ordinateurs",
      thg: "Théorie des Graphes",
      english: "Anglais",
      "english-s4": "Anglais",
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
      exam: "Exams",
      examSolutions: "Solutions Exams",
    },
    seriesLabel: "Série",
    nav: {
      home: "Accueil",
      years: "Années",
      about: "À propos",
      search: "Recherche",
      feedback: "Commentaires",
      more: "Plus",
      comingSoon: "Bientôt disponible",
      switchLanguage: "Changer de langue",
    },
    footer: {
      quickLinks: "Liens rapides",
      academicYears: "Années académiques",
      programmingLangs: "Langages de programmation",
      connectWithUs: "Contactez-nous",
      copyright: "Droits d'auteur",
      firstYear: "L1 - Première année",
      secondYear: "L2 - Deuxième année",
      thirdYear: "L3 - Troisième année",
      masterYear1: "M1 - Master 1",
      masterYear2: "M2 - Master 2",
    },
    hero: {
      title: "Hub Étudiant UHBC CS",
      subtitle: "Ressources CS organisées par année académique (L1→M2) : cours, TD, TP et code",
      exploreNow: "Explorer maintenant",
      announcementTitle: "🎉 Nouvelle fonctionnalité disponible !",
      announcementDesc: "Notre puissante fonctionnalité de recherche est maintenant en ligne ! Trouvez instantanément des cours, TD, TP et fichiers de code dans tous les modules.",
      courses: "Cours",
      codes: "Codes",
    },
    years: {
      licence: "Licence",
      master: "Master",
      firstYear: "Première année",
      secondYear: "Deuxième année",
      thirdYear: "Troisième année",
      masterYear1: "Master 1",
      masterYear2: "Master 2",
    },
    about: {
      title: "À propos de la plateforme UHBC CS",
      subtitle: "Une plateforme moderne et conviviale conçue pour aider les étudiants en Informatique L2 de l'UHBC à accéder efficacement à toutes leurs ressources académiques.",
      comprehensiveResources: "Ressources complètes",
      comprehensiveResourcesDesc: "Accédez à tous les documents de cours, TD, TP et fichiers de code sur une plateforme centralisée.",
      organizedByModule: "Organisé par module",
      organizedByModuleDesc: "Naviguez facilement à travers 7 modules différents avec une catégorisation intuitive.",
      programmingLanguage: "Langages de programmation",
      programmingLanguageDesc: "Explorez les ressources de programmation pour C, Python, Java et Assembleur avec des exercices pratiques et des exemples.",
      missionTitle: "Notre mission",
      missionText: "Nous croyons en l'autonomisation des étudiants grâce à une éducation accessible. Cette plateforme a été créée pour centraliser toutes les ressources académiques des étudiants en Informatique L2 de l'UHBC, facilitant ainsi la recherche de matériel, la collaboration entre pairs et la réussite dans vos études. Avec des fonctionnalités telles que des pages de modules organisées, une recherche avancée et une gestion sécurisée des fichiers via Google Drive, nous nous engageons à améliorer votre expérience d'apprentissage.",
      advancedSearch: "Recherche avancée",
      advancedSearchDesc: "Trouvez rapidement n'importe quelle ressource dans tous les modules avec notre fonctionnalité de recherche puissante.",
      multipleResourceTypes: "Plusieurs types de ressources",
      multipleResourceTypesDesc: "Accédez aux cours, TD, TP, examens, solutions, vidéos YouTube, livres et plus encore en un seul endroit.",
      bilingualSupport: "Support bilingue",
      bilingualSupportDesc: "Support complet pour les langues française et anglaise sur toute la plateforme.",
    },
    search: {
      title: "Rechercher des ressources",
      subtitle: "Trouvez des cours, TD, TP et fichiers de code dans tous les modules",
      placeholder: "Rechercher par titre, mot-clé...",
      type: "Type",
      module: "Module",
      semester: "Semestre",
      allTypes: "Tous les types",
      allModules: "Tous les modules",
      allSemesters: "Tous les semestres",
      found: "Trouvé",
      results: "résultats",
      result: "résultat",
      noResults: "Aucun résultat trouvé",
      noResultsDesc: "Essayez d'ajuster vos filtres ou votre terme de recherche",
      startSearching: "Commencer la recherche",
      startSearchingDesc: "Entrez un terme de recherche ou utilisez les filtres pour trouver des ressources",
      open: "Ouvrir",
      problem: "Problème :",
    },
    feedback: {
      title: "Vos commentaires comptent",
      subtitle: "Aidez-nous à nous améliorer en partageant vos réflexions. Cela n'apparaîtra qu'une fois par appareil.",
      thankYou: "Merci !",
      thankYouDesc: "Nous apprécions vos commentaires et les utiliserons pour améliorer notre site web.",
      goToHome: "Aller à l'accueil",
      yourName: "Votre nom",
      yourNameDesc: "Veuillez entrer votre nom",
      enterName: "Entrez votre nom",
      usefulness: "Trouvez-vous ce site web utile ?",
      usefulnessDesc: "Évaluez votre expérience de Faible à Excellent",
      excellent: "Excellent - Très utile",
      veryGood: "Très bien - Très utile",
      good: "Bien - Utile",
      fair: "Moyen - Assez utile",
      poor: "Faible - Pas très utile",
      filePreference: "Comment les fichiers doivent-ils être inclus ?",
      filePreferenceDesc: "Les ressources doivent-elles être incluses en PDF ou conserver les liens Drive ?",
      includePdfs: "Inclure les fichiers en PDF",
      keepDriveLinks: "Conserver les liens Drive (approche actuelle)",
      bothPdfsAndLinks: "PDFs et liens Drive",
      noPreference: "Aucune préférence",
      themeLiked: "Aimez-vous le thème de couleur ?",
      themeLikedDesc: "Votre opinion sur le schéma de couleurs actuel",
      yes: "Oui, je l'aime",
      no: "Non, je ne l'aime pas",
      themeSuggestions: "Suggestions de thème de couleur",
      themeSuggestionsDesc: "Quels changements aimeriez-vous voir dans le thème de couleur ?",
      themeSuggestionsPlaceholder: "Partagez vos suggestions de thème de couleur...",
      futureFeatures: "Que souhaiteriez-vous voir à l'avenir ?",
      futureFeaturesDesc: "Partagez toute fonctionnalité, amélioration ou idée que vous aimeriez voir sur ce site web.",
      futureFeaturesPlaceholder: "Dites-nous quelles fonctionnalités vous aimeriez voir...",
      characters: "caractères",
      skip: "Passer",
      submitFeedback: "Soumettre les commentaires",
      submitting: "Envoi en cours...",
    },
    notFound: {
      title: "404",
      message: "Oups ! Page non trouvée",
      returnHome: "Retour à l'accueil",
    },
    modulePage: {
      back: "Retour",
      other: "Autre",
      ytVideos: "Vidéos YouTube",
      books: "Livres",
      resumes: "Résumés",
      scrollLeft: "Défiler vers la gauche",
      scrollRight: "Défiler vers la droite",
    },
    yearPage: {
      backToYears: "Retour aux années",
      yearNotFound: "Année non trouvée",
      backToHome: "Retour à l'accueil",
      resourcesComingSoon: "Les ressources pour {year} seront bientôt disponibles. Organisation du contenu en cours...",
      s3Modules: "Modules S3",
      s4Modules: "Modules S4",
      programmingLanguages: "Langages de programmation",
    },
    intro: {
      title: "Ressources UHBC CS",
      subtitle: "Organisé, rapide et axé sur les étudiants — chargement…",
    },
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
      console.warn("LanguageContext: failed to read localStorage", e);
    }
    const nav = typeof navigator !== "undefined" ? navigator.language : "en";
    return nav && nav.startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {
      console.warn("LanguageContext: failed to write localStorage", e);
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
