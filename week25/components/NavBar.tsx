"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { href: "/restaurants", label: "맛집 목록" },
  { href: "/random", label: "랜덤 맛집" },
  { href: "/about", label: "소개" },
];


export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 font-medium">
      {menus.map((menu) => {
        const isActive = pathname.startsWith(menu.href);

        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={
              isActive
                ? "font-bold text-orange-500 underline underline-offset-8"
                : "text-gray-600 hover:text-orange-500"
            }
          >
            {menu.label}
          </Link>
        );
      })}
    </nav>
  );
}
