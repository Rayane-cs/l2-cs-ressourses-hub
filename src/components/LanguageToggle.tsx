import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

const LanguageToggle: React.FC = () => {
  const { lang, setLang, t } = useLanguage();

  const toggle = () => setLang(lang === "en" ? "fr" : "en");

  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="flex items-center gap-2">
      <span className="text-sm">{lang === "en" ? "EN" : "FR"}</span>
      <span className="sr-only">{t.nav.switchLanguage}</span>
    </Button>
  );
};

export default LanguageToggle;
