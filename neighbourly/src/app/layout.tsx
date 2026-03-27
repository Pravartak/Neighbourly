import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neighborly - Turn Everyday Tasks Into Quests",
  description:
    "A hyper-local task-sharing platform where users complete small quests for rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
