'use client';

import { useState } from "react";
import dynamic from "next/dynamic";

const MovieReviews = dynamic(() => import("./MovieReviews"), {
  loading: () => <p>관람평을 불러오는 중입니다...</p>,
});

export default function MovieReviewsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="movie-reviews-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "닫기" : "관람평 보기"}
      </button>

      {isOpen && <MovieReviews />}
    </div>
  );
}
