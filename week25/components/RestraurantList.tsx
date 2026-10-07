"use client";

import Link from "next/link";
import { useState } from "react";
import { restaurants } from "@/data/restaurants";

const categories = [
  "전체",
  ...new Set(restaurants.map((restaurant) => restaurant.category)),
];

export default function RestaurantList() {
  const [selected, setSelected] = useState("전체");

  const filtered =
    selected === "전체"
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.category === selected);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`rounded-full border border-orange-500 px-4 py-2 font-bold ${
              selected === category
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-500 hover:bg-orange-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-4">
        {filtered.map((restaurant) => (
          <li key={restaurant.id}>
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="flex flex-col gap-2 rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <span className="text-4xl">{restaurant.emoji}</span>
              <span className="text-lg font-bold">{restaurant.name}</span>
              <span className="text-sm text-gray-500">
                {restaurant.category} · {restaurant.menu}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
