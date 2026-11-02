import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-5xl font-bold text-orange-500">404</h1>
      <p className="text-xl font-bold">그 맛집은 아직 맛집 도감에 없어요!</p>
      <p className="text-gray-600">
        많이많이 등록해주세용
      </p>
      <Link
        href="/restaurants"
        className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
      >
        맛집 목록 보러 가기
      </Link>
    </div>
  );
}
