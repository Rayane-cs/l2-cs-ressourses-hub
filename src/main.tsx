import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./contexts/LanguageContext";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider attribute="class" defaultTheme="system">
		<LanguageProvider>
			<App />
		</LanguageProvider>
	</ThemeProvider>
);
