import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE INSIDER — IT Practice Platform",
  description:
    "منصة عربية لاختبار مهاراتك في تكنولوجيا المعلومات. 15 تخصصاً، حتى 5 مستويات، أكثر من 750 سؤالاً عملياً. | Bilingual IT practice platform — 15 tracks, up to 5 levels, 750+ questions.",
  applicationName: "THE INSIDER",
  authors: [{ name: "Muhammad Bibi" }],
  keywords: [
    "IT", "Arabic IT learning", "تعلم البرمجة", "DevOps", "Linux",
    "cybersecurity", "networking", "databases", "web development",
    "interview practice", "اختبار مقابلات", "تقنية المعلومات",
  ],
  openGraph: {
    title: "THE INSIDER — IT Practice Platform",
    description: "15 IT specializations, up to 5 levels each, 750+ bilingual questions.",
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070E14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Default dir/lang is set here; client-side LocaleProvider updates it after hydration.
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="bg-void text-ink min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
