"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="w-fit text-orange-500 underline"
    >
      목록으로 돌아가기
    </button>
  );
}
