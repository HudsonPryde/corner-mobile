import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setSellers } from '../slices/sellers';

const sellersApi = createApi({
  reducerPath: 'sellersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.10:3000/sellers' }),
  tagTypes: ['Sellers'],
  endpoints: (build) => ({
    getSellers: build.query<any[], void>({
      query: () => '/locations',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setSellers(response.data));
        } catch (error) {
          console.error('Error fetching sellers data', error);
        }
      },
      providesTags: ['Sellers'],
    }),
  }),
});

export const { useGetSellersQuery } = sellersApi;

export default sellersApi;
