import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "عارض الصورة",
  description: "ارفع صورة لمشاركتها معي"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
