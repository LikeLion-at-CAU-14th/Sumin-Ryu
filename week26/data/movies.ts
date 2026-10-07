export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  description: string;
  image: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: '극장판 치이카와: 인어섬의 비밀',
    year: 2026,
    genre: '애니메이션, 모험',
    director: '나가노',
    description:
      '치이카와와 친구들이 신비로운 인어섬으로 떠나는 이야기입니다.\n작고 귀여운 친구들이 섬에 숨겨진 비밀을 함께 풀어갑니다.',
    image: '/posters/chica.jpg',
  },
  {
    id: 2,
    title: '엘리멘탈',
    year: 2023,
    genre: '애니메이션, 로맨스',
    director: '피터 손',
    description:
      '불, 물, 공기, 흙의 원소들이 함께 살아가는 엘리멘트 시티의 이야기입니다.\n불처럼 뜨거운 앰버와 물처럼 유연한 웨이드가 서로 다름을 넘어 가까워집니다.',
    image: '/posters/elemental.jpg',
  },
  {
    id: 3,
    title: '하울의 움직이는 성',
    year: 2004,
    genre: '애니메이션, 판타지',
    director: '미야자키 하야오',
    description:
      '마법에 걸려 할머니가 된 소녀 소피가 마법사 하울의 성에 들어가며 시작되는 이야기입니다.\n전쟁과 마법 속에서 사랑과 용기를 찾아가는 여정을 그립니다.',
    image: '/posters/howl.jpg',
  },
  {
    id: 4,
    title: '쿵푸팬더 3',
    year: 2016,
    genre: '애니메이션, 액션',
    director: '여인영, 알레산드로 칼로니',
    description:
      '용의 전사 포가 오래전 헤어진 친아빠를 만나 판다 마을로 향하는 이야기입니다.\n강력한 악당 카이에 맞서 판다들에게 쿵푸를 가르치며 진정한 자신을 찾아갑니다.',
    image: '/posters/panda.jpg',
  },
  {
    id: 5,
    title: '서울의 봄',
    year: 2023,
    genre: '드라마, 역사',
    director: '김성수',
    description:
      '1979년 12월 12일, 수도 서울에서 벌어진 군사 반란의 9시간을 그린 이야기입니다.\n반란군에 맞서 서울을 지키려는 사람들의 긴박한 대치를 담아냅니다.',
    image: '/posters/seoul.jpg',
  },
  {
    id: 6,
    title: '스파이더맨: 홈커밍',
    year: 2017,
    genre: '액션, SF',
    director: '존 와츠',
    description:
      '어벤져스 합류를 꿈꾸는 고등학생 피터 파커의 이야기입니다.\n평범한 학교생활과 히어로 활동 사이에서 진짜 스파이더맨으로 성장해갑니다.',
    image: '/posters/spider.jpg',
  },
];
