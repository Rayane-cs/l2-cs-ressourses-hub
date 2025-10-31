import { Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-primary transition-smooth">
                Home
              </Link>
              <Link to="/search" className="hover:text-primary transition-smooth">
                Search
              </Link>
              {/* Chat removed - feature not implemented. */}
              <Link to="/about" className="hover:text-primary transition-smooth">
                About
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Modules</h3>
            <div className="flex flex-col gap-2">
              <Link to="/module/algo" className="hover:text-primary transition-smooth">
                Algo
              </Link>
              <Link to="/module/archi-ord" className="hover:text-primary transition-smooth">
                Archi-Ord
              </Link>
              <Link to="/module/thg" className="hover:text-primary transition-smooth">
                THG
              </Link>
              <Link to="/module/english" className="hover:text-primary transition-smooth">
                English
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-smooth"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm">
          <p>Copyright © {new Date().getFullYear()} UHBC L2 CS. All rights reserved.Nehal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
