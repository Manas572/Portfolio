import { JetBrains_Mono } from "next/font/google";
import TypingCat from "./cat2/page";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Manas Kumar | Portfolio",
  description: "An AI + Linux like portfolio with GUI + CLI interactions",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>
        {children}
      </body>
    </html>
  );
}
