import MovieReviewsButton from '@/components/MovieReviewsButton';
import { movies } from '@/data/movies';
import { Do_Hyeon } from 'next/font/google';
import Image from 'next/image';

const doHyeon = Do_Hyeon({
  weight: '400',
  subsets: ['latin'],
});

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return movies.map((movie) => ({ id: String(movie.id) }));
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;

  const movie = movies.find(
    (movie) => movie.id === Number(id)
  );

  if (!movie) {
    return <p>영화를 찾을 수 없습니다.</p>;
  }

  return (
    <main className={doHyeon.className}>
      <h1>{movie.title}</h1>
      
      <Image
        src={movie.image}
        alt={movie.title}
        width={300}
        height={432}
        preload
        style={{ objectFit: 'cover' }}
      />

      <p>
        {movie.year} · {movie.genre} · {movie.director}
      </p>

      <p style={{ whiteSpace: 'pre-line' }}>{movie.description}</p>

      {/*과제3 - 관람평 불러오기*/}
      <MovieReviewsButton />

    </main>
  );
}