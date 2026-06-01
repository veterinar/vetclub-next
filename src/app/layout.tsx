import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "VetClub.ru — Ветеринария для профессионалов",
  description: "Справочная информация для ветврача. Статьи по ветеринарной терапии, хирургии, дерматологии, офтальмологии, диагностике.",
  keywords: "ветеринария, ветврач, ветеринарные статьи",
  openGraph: {
    title: "VetClub.ru — Ветеринария для профессионалов",
    description: "Справочная информация для ветврача. 118 статей по ветеринарии.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
