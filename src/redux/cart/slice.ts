import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const { id, size, type } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id
          && item.size === size
          && item.type === type
      );

      if (existingItem) {
        existingItem.count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItemIndex = state.items.findIndex(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItemIndex !== -1 && state.items[findItemIndex].count > 0) {
        state.items[findItemIndex].count--;
        state.totalPrice = calcTotalPrice(state.items);
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(
        (obj) =>
          !(obj.id === action.payload.id
            && obj.size === action.payload.size
            && obj.type === action.payload.type
          )
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
