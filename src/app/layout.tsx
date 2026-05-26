import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Rahul Kumar Tiwari — ML & Signal Processing",
    template: "%s | Rahul Kumar Tiwari",
  },
  description:
    "M.Tech researcher specializing in Communication Signal Processing and Machine Learning. Building intelligent systems at the intersection of wireless communications and deep learning.",
  keywords: [
    "Machine Learning", "Signal Processing", "Deep Learning",
    "OFDM", "MIMO", "Transformer", "Reinforcement Learning",
  ],
  authors: [{ name: "Rahul Kumar Tiwari" }],
  openGraph: {
    type: "website",
    title: "Rahul Kumar Tiwari — ML & Signal Processing",
    description: "M.Tech researcher in Communication Signal Processing & Machine Learning.",
    siteName: "Rahul Kumar Tiwari Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}