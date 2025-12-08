import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals_notifications_share.css";
import "./features.css";
import "./components/adsense.css";
import "./components/texttospeech.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "./components/Header";
import LevelUpToast from "./components/LevelUpToast";
import AdSenseScript from "./components/AdSenseScript";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fabula - Hikayelerin Buluşma Noktası",
  description: "Hikayeleri keşfedin, okuyun ve yorumlayın. Fabula ile hikaye dünyasına katılın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <AdSenseScript publisherId={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-1334433458655438'} />
            <Header />
            {children}
            <LevelUpToast />
          </AuthProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
    </html>
  );
}
