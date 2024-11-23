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

export const mutationApi = createApi({
  reducerPath: 'mutationApi',
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
    createWallet: builder.mutation({
      query: (body: any) => {
        return {
          url: `multicurrency-wallets/create`,
          method: 'POST',
          body: body,
        };
      },
    }),
    sendChi: builder.mutation({
      query: (body: any) => {
        return {
          url: `multicurrency-wallets/transfer`,
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

export const {useCreateWalletMutation, useSendChiMutation} = mutationApi;
