
import * as React from "react";
import { ThemeProvider as TailwindThemeProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  return (
    <TailwindThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      storageKey={storageKey}
    >
      {children}
    </TailwindThemeProvider>
  );
}
