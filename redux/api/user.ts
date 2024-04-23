import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types';
import { setUser, setLoyaltyPrograms } from '../slices/user';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.10:3000/customers/' }),
  tagTypes: ['User', 'LoyaltyPrograms'],
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (uid: string) => `${uid}`,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setUser(response.data));
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      },
      providesTags: ['User'],
    }),
    createUser: build.mutation<User, Partial<User>>({
      query: (body: User) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getLoyaltyPrograms: build.query<string[], string>({
      query: (id: string) => `${id}/loyalty-accounts`,
      providesTags: ['LoyaltyPrograms'],
      transformResponse: (response: string[]) => {
        // response is list of stringified JSON objects
        // parse to list and return
        return response.map((data) => JSON.parse(data));
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setLoyaltyPrograms(response.data));
        } catch (error) {
          console.error('Error fetching loyalty programs', error);
        }
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useGetLoyaltyProgramsQuery,
} = userApi;

export default userApi;
