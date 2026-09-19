import type { Metadata } from "next";
import "./globals.css";
import "./academy.css";
export const metadata: Metadata = {
  title: "Quantum Playground — a field guide to big ideas",
  description:
    "Learn quantum mechanics, relativity and mathematics through substantial explanations, clear vocabulary, worked examples and interactive experiments.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("quantum-theme");document.documentElement.dataset.theme=t==="dark"||t==="light"?t:"light"}catch(e){document.documentElement.dataset.theme="light"}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
