import { TanstackProvider } from "@/components/providers/tanstack-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "Banky",
  description: "Banky is a modern banking platform for everyone",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <TanstackProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
