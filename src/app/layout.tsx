import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE INSIDER — IT Practice Platform",
  description:
    "منصة عربية لاختبار مهاراتك في تكنولوجيا المعلومات. 14 تخصص، 5 مستويات، 700 سؤال عملي. | Bilingual IT practice platform — 14 tracks × 5 levels × 700 questions.",
  applicationName: "THE INSIDER",
  authors: [{ name: "Muhammad Bibi" }],
  keywords: [
    "IT", "Arabic IT learning", "تعلم البرمجة", "DevOps", "Linux",
    "cybersecurity", "networking", "databases", "web development",
    "interview practice", "اختبار مقابلات", "تقنية المعلومات",
  ],
  openGraph: {
    title: "THE INSIDER — IT Practice Platform",
    description: "14 IT specializations, 5 levels each, 700 bilingual questions.",
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
