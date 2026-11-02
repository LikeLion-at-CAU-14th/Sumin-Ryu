"use client";

import { useRouter } from "next/navigation";
import { restaurants } from "@/data/restaurants";

export default function RandomPage() {
  const router = useRouter();

  const handleClick = () => {
    const index = Math.floor(Math.random() * restaurants.length);
    const picked = restaurants[index];
    router.push(`/restaurants/${picked.id}`);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <p className="text-6xl">🎲</p>
      <h1 className="text-4xl font-bold">점메추? 저메추?</h1>
      <button
        onClick={handleClick}
        className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
      >
        랜덤 맛집 뽑기
      </button>
    </div>
  );
}
