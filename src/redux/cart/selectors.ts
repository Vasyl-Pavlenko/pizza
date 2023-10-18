import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string, size: number, type: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id && obj.size === size && obj.type === type);
  