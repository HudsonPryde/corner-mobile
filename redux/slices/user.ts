import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Loyalty, User } from '@/types';

export interface UsersState {
  user: User | null;
  loyaltyPrograms: Loyalty[];
}

const initialState: UsersState = {
  user: null,
  loyaltyPrograms: [],
};

export const users = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setLoyaltyPrograms: (state, action: PayloadAction<any>) => {
      state.loyaltyPrograms = action.payload;
    },
  },
});

export const { setUser, setLoyaltyPrograms } = users.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectLoyaltyPrograms = (state: RootState) =>
  state.users.loyaltyPrograms;
export const selectLoyaltyAccount = (id: string) => (state: RootState) =>
  state.users.loyaltyPrograms.find((program) =>
    program.account.id === id ? program : null
  );

export default users.reducer;
