import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/src/components/AppShell";

export const metadata: Metadata = {
  title: "InnovatEPAM Portal",
  description: "Employee Innovation Management Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
