import { Karla, Geist, Geist_Mono } from "next/font/google"; // Dodano Karla do importu
import "./globals.css";

// 1. Konfiguracja Karli
const karla = Karla({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-karla",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Projektomat",
  description: "Projektomat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body
        className={`${karla.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}