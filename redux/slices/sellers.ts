import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SellersState {
  sellers: any[];
}

const initialState: SellersState = {
  sellers: [],
};

export const sellers = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    setSellers: (state, action) => {
      state.sellers = action.payload;
    },
  },
});

export const { setSellers } = sellers.actions;

export const selectSellers = (state: RootState) => state.sellers.sellers;

export default sellers.reducer;
