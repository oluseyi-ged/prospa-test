import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

interface CustomError {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
  status: number;
}

const baseUrl = 'https://api-v2-sandbox.chimoney.io/v0.2/';

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      headers.set(
        'X-API-KEY',
        'a9c78b8f145ae9f146bd8c607917fe2a196c4cc94ff2c4937385c37408ebf052',
      );

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: builder => ({
    getRates: builder.query({
      query: () => ({
        url: 'info/exchange-rates',
      }),
    }),
    getHistory: builder.query({
      query: body => ({
        url: 'accounts/transactions',
        body,
      }),
    }),
    getWallets: builder.query({
      query: id => ({
        url: `multicurrency-wallets/get?id=${id}`,
      }),
    }),
  }),
});

export const {
  useGetRatesQuery,
  useLazyGetHistoryQuery,
  useLazyGetWalletsQuery,
} = queryApi;
