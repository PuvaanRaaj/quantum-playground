import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Quantum Playground — a thought experiment lab",
  description:
    "Predict, experiment, and understand quantum interference. An interactive Rust/WebAssembly physics lab with an optional tool-using AI tutor.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
