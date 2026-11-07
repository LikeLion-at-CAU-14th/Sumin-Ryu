import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlbum } from "@/data/albums";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const album = getAlbum(id);

  if (!album) {
    return { title: "앨범을 찾을 수 없어요" };
  }

  return {
    title: album.title,
    description: `${album.artist}의 ${album.year}년 ${album.genre} 앨범. ${album.description}`,
  };
}

// 과제: generateMetadata에 openGraph 추가해서 앨범 표지가 링크 미리보기에 뜨게 하기

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = getAlbum(id);

  if (!album) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>

      <div className="detail">
        <Image
          src={album.cover}
          alt={`${album.artist} - ${album.title} 앨범 표지`}
          width={600}
          height={600}
          className="detail-cover"
          priority
        />

        <div className="detail-info">
          <div className="detail-genre">
            {album.genre} · {album.year}
          </div>
          {/* 과제: 앨범 제목을 div 대신 알맞은 시맨틱 태그로 바꾸기 */}
          <div className="detail-title">{album.title}</div>
          <div className="detail-artist">{album.artist}</div>
          <p className="detail-desc">{album.description}</p>

          <div className="track-heading">수록곡</div>
          <ol className="track-list">
            {album.tracks.map((track) => (
              <li key={track}>{track}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
