import { Github, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/home" className="hover:text-primary transition-smooth">
                Home
              </Link>
              <Link to="/search" className="hover:text-primary transition-smooth">
                Search
              </Link>
              <Link to="/about" className="hover:text-primary transition-smooth">
                About
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Academic Years</h3>
            <div className="flex flex-col gap-2">
              <Link to="/year/l1" className="hover:text-primary transition-smooth">
                L1 - First Year
              </Link>
              <Link to="/year/l2" className="hover:text-primary transition-smooth">
                L2 - Second Year
              </Link>
              <Link to="/year/l3" className="hover:text-primary transition-smooth">
                L3 - Third Year
              </Link>
              <Link to="/year/m1" className="hover:text-primary transition-smooth">
                M1 - Master Year 1
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Programming Langs</h3>
            <div className="flex flex-col gap-2">
              <Link to="/programming-language/c" className="hover:text-primary transition-smooth">
                C Language
              </Link>
              <Link to="/programming-language/python" className="hover:text-primary transition-smooth">
                Python
              </Link>
              <Link to="/programming-language/java" className="hover:text-primary transition-smooth">
                Java
              </Link>
              <Link to="/programming-language/assembly" className="hover:text-primary transition-smooth">
                Assembly
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <div
                className="opacity-50 cursor-not-allowed relative"
                title="Coming soon"
              >
                <Github className="h-6 w-6" />
              </div>
              <div
                className="opacity-50 cursor-not-allowed relative"
                title="Coming soon"
              >
                <Linkedin className="h-6 w-6" />
              </div>
              <a
                href="https://t.me/youbi_0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
              >
                <Send className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm">
          <p>Copyright © {new Date().getFullYear()} UHBC CS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
