import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeColorProvider } from "./contexts/ThemeColorContext";
import { AuthProvider } from "./contexts/AuthContext";
import { UsageTrackingProvider } from "./contexts/UsageTrackingContext";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider attribute="class" defaultTheme="system">
		<AuthProvider>
			<ThemeColorProvider>
				<LanguageProvider>
					<UsageTrackingProvider>
						<App />
					</UsageTrackingProvider>
				</LanguageProvider>
			</ThemeColorProvider>
		</AuthProvider>
	</ThemeProvider>
);
