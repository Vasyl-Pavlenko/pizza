import { SortPropertyEnum } from "../redux/filter/types";

export interface PizzaProps  {
  id: string;
  title: string;
  desc: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: number;
};

export type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
  category: number;
};

export type CategoriesProps = {
  value: number;
  handleChangeCategory: (idx: number) => void;
};

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type PopupClick = MouseEvent & {
  path: Node[];
};
