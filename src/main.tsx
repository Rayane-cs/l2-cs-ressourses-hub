import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeColorProvider } from "./contexts/ThemeColorContext";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider attribute="class" defaultTheme="system">
		<ThemeColorProvider>
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</ThemeColorProvider>
	</ThemeProvider>
);
