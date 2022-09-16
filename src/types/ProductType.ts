export type ProductType = {
  name: string;
  price: number;
  subtitle: string;
  imgURL: string;
  item: itemType;
};

export type itemType = {
  name: string;
  weight: number;
  explanation: string;
  fat: number;
  producing_area: string;
  num: number;
  // seasonは1~12月で定義
  season_start: number;
  season_end: number;
};
