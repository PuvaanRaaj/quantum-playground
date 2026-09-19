import type { Metadata } from "next";
import "./globals.css";
import "./academy.css";
export const metadata: Metadata = {
  title: "Quantum Playground — Physics and Mathematics",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Math&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
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
