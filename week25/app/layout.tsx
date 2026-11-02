import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "맛집 도감",
  description: "우리 학교 앞 맛집을 모아둔 도감",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="ko">
      <body className="min-h-screen bg-orange-50 text-gray-900">
        <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
          <Link href="/" className="text-xl font-bold text-orange-500">
            🦁 맛집 도감
          </Link>
          <NavBar />
        </header>
        <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
      </body>
    </html>
  )
}