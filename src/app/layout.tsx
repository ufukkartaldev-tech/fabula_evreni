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
  title: {
    default: "Fabula - İnteraktif Hikaye Platformu",
    template: "%s | Fabula"
  },
  description: "Kullanıcıların birlikte hikayeler oluşturabildiği, okuyabildiği ve hikayelerin gidişatına yön verebildiği modern bir hikaye platformu. İnteraktif hikayeler, oyunlaştırma ve sosyal özelliklerle dolu!",
  keywords: ["hikaye", "interaktif hikaye", "storytelling", "yazarlık", "okuma", "hikaye yazma", "topluluk", "oyunlaştırma", "next.js", "react"],
  authors: [{ name: "Ufuk Kartal" }],
  creator: "Ufuk Kartal",
  publisher: "Fabula",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fabula-evreni.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fabula - İnteraktif Hikaye Platformu",
    description: "Kullanıcıların birlikte hikayeler oluşturabildiği, okuyabildiği ve hikayelerin gidişatına yön verebildiği modern bir hikaye platformu",
    url: 'https://fabula-evreni.vercel.app',
    siteName: 'Fabula',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fabula - İnteraktif Hikaye Platformu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fabula - İnteraktif Hikaye Platformu",
    description: "Kullanıcıların birlikte hikayeler oluşturabildiği modern hikaye platformu",
    images: ['/og-image.png'],
    creator: '@ufukkartal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
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
