"use client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "./theme-providers";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode; }): JSX.Element {
  return (
      <RecoilRoot>
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </SessionProvider>
      </RecoilRoot>
  );
}