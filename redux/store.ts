import { configureStore } from '@reduxjs/toolkit';
import userApi from './api/user';
import sellersApi from './api/sellers';
import users from './slices/user';
import sellers from './slices/sellers';

const store = configureStore({
  reducer: {
    users,
    sellers,
    [userApi.reducerPath]: userApi.reducer,
    [sellersApi.reducerPath]: sellersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, sellersApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
