import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon, Laptop } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const current = theme === "system" ? resolvedTheme : theme;

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <Button variant="ghost" size="sm" onClick={cycle} className="flex items-center gap-2">
      {current === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
