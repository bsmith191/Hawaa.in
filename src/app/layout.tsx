import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hawaa - Premium Air Purifiers | Breathe Clean",
  description: "Hawaa Edge - India's premium air purifier. Experience cleaner air with advanced filtration technology. Made in India with 1 year PAN India warranty.",
  keywords: ["air purifier", "Hawaa", "Hawaa Edge", "clean air", "India", "premium air purifier"],
  openGraph: {
    title: "Hawaa - Premium Air Purifiers",
    description: "Hawaa Edge - India's premium air purifier. Experience cleaner air with advanced filtration technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
