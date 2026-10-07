// data/restaurants.ts
export type Restaurant = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  menu: string;
  price: number;
  comment: string;
};

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "일이삼식당",
    category: "한식",
    emoji: "🍚",
    menu: "제육볶음",
    price: 9000,
    comment: "볶음밥 필수",
  },
  {
    id: 2,
    name: "기꾸스시",
    category: "일식",
    emoji: "🍣",
    menu: "모둠 초밥",
    price: 12000,
    comment: "연어초밥이 미침",
  },
  {
    id: 3,
    name: "내가한찜닭",
    category: "한식",
    emoji: "🍗",
    menu: "순살 찜닭",
    price: 23000,
    comment: "혼밥 못함 ㅜㅜ",
  },
  {
    id: 4,
    name: "커리야",
    category: "일식",
    emoji: "🍛",
    menu: "치킨 마크니?",
    price: 13500,
    comment: "오늘 세션 전에 먹음",
  },
  {
    id: 5,
    name: "성민양꼬치",
    category: "중식",
    emoji: "🍢",
    menu: "양꼬치",
    price: 13000,
    comment: "하오취",
  },
  {
    id: 6,
    name: "수목식당",
    category: "한식",
    emoji: "🍜",
    menu: "잔치국수",
    price: 4000,
    comment: "앙트레 교수님 픽",
  },
];
