"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import type { Locale } from "@/types/question";
import { DEFAULT_LOCALE, dirAttr } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  dir: "rtl" | "ltr";
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "insider-it:locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "ar" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Sync <html> attributes + persist
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dirAttr(locale);
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(
    () => setLocaleState((prev) => (prev === "ar" ? "en" : "ar")),
    [],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle, dir: dirAttr(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}
