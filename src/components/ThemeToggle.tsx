import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon, Laptop, ChevronDown, Check, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { useThemeColor } from "@/contexts/ThemeColorContext";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { themeColor, setThemeColor } = useThemeColor();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1.5 px-2">
          <div className="relative">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          <ChevronDown className="h-3 w-3 opacity-50" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 animate-fade-in">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground ml-1">Color Palette</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setThemeColor("pink")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#d63384] border border-stone-200"></div>
                Pink
              </span>
              {themeColor === "pink" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeColor("red")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#800020] border border-stone-200"></div>
                Red
              </span>
              {themeColor === "red" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeColor("blue")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500 border border-stone-200"></div>
                Blue
              </span>
              {themeColor === "blue" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeColor("green")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 border border-stone-200"></div>
                Green
              </span>
              {themeColor === "green" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setThemeColor("purple")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-violet-600 border border-stone-200"></div>
                Purple
              </span>
              {themeColor === "purple" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground ml-1">Appearance</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2"><Sun className="h-3 w-3" /> Light</span>
              {theme === "light" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2"><Moon className="h-3 w-3" /> Dark</span>
              {theme === "dark" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2"><Laptop className="h-3 w-3" /> System</span>
              {theme === "system" && <Check className="h-3 w-3" />}
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
