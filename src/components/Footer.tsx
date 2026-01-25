import { Github, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-secondary text-secondary-foreground py-12" role="contentinfo" aria-label="Footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
            <div className="flex flex-col gap-2">
              <Link to="/home" className="hover:text-primary transition-smooth">
                {t.nav.home}
              </Link>
              <Link to="/search" className="hover:text-primary transition-smooth">
                {t.nav.search}
              </Link>
              <Link to="/about" className="hover:text-primary transition-smooth">
                {t.nav.about}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.academicYears}</h3>
            <div className="flex flex-col gap-2">
              <Link to="/year/l1" className="hover:text-primary transition-smooth">
                {t.footer.firstYear}
              </Link>
              <Link to="/year/l2" className="hover:text-primary transition-smooth">
                {t.footer.secondYear}
              </Link>
              <Link to="/year/l3" className="hover:text-primary transition-smooth">
                {t.footer.thirdYear}
              </Link>
              <Link to="/year/m1" className="hover:text-primary transition-smooth">
                {t.footer.masterYear1}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.programmingLangs}</h3>
            <div className="flex flex-col gap-2">
              <Link to="/programming-languages/html" className="hover:text-primary transition-smooth">
                HTML
              </Link>
              <Link to="/programming-languages/c" className="hover:text-primary transition-smooth flex items-center gap-2 group">
                C Language <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 px-1.5 rounded-full uppercase font-bold tracking-tighter">Soon</span>
              </Link>
              <Link to="/programming-languages/python" className="hover:text-primary transition-smooth flex items-center gap-2 group">
                Python <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 px-1.5 rounded-full uppercase font-bold tracking-tighter">Soon</span>
              </Link>
              <Link to="/programming-languages/java" className="hover:text-primary transition-smooth flex items-center gap-2 group">
                Java <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 px-1.5 rounded-full uppercase font-bold tracking-tighter">Soon</span>
              </Link>
              <Link to="/programming-languages/assembly" className="hover:text-primary transition-smooth flex items-center gap-2 group">
                Assembly <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 px-1.5 rounded-full uppercase font-bold tracking-tighter">Soon</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.connectWithUs}</h3>
            <div className="flex gap-4">
              <div
                className="opacity-50 cursor-not-allowed relative"
                title={t.nav.comingSoon}
                aria-label={`GitHub (${t.nav.comingSoon})`}
                role="img"
              >
                <Github className="h-6 w-6" />
              </div>
              <div
                className="opacity-50 cursor-not-allowed relative"
                title={t.nav.comingSoon}
                aria-label={`LinkedIn (${t.nav.comingSoon})`}
                role="img"
              >
                <Linkedin className="h-6 w-6" />
              </div>
              <a
                href="https://t.me/youbi_0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
                aria-label="Contact us on Telegram"
              >
                <Send className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm">
          <p>{t.footer.copyright} © {new Date().getFullYear()} UHBC CS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
