import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const clientApi = createApi({
  reducerPath: 'clients',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints(builder) {
    return {
      fetchClients: builder.query({
        query: () => {
          return {
            url: 'clients',
            method: 'GET',
          };
        },
      }),
    };
    addClient: builder.mutation({
        invalidatesTags: ['clients'],
        query: (body) => {
            return {
                url: 'clients',
                method: 'POST',
                body,
            };
            }
        
    })
  },
});
const senderApi = createApi({
  reducerPath: 'sender',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints(builder) {
    return {
      fetchSender: builder.query({
        query: () => {
          return {
            url: 'sender',
            method: 'GET',
          };
        },
      }),
    };
  },
});
const itemsApi = createApi({
  reducerPath: 'items',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints(builder) {
    return {
      fetchItems: builder.query({
        query: () => {
          return {
            url: 'items',
            method: 'GET',
          };
        },
      }),
    };
  },
});
const invoiceApi = createApi({
  reducerPath: 'invoice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints(builder) {
    return {
      fetchInvoice: builder.query({
        query: (id) => {
          return {
            url: 'invoice',
            method: 'GET',
            params:id,
          };
        },
      }),
      recordPayment: builder.mutation({
        invalidatesTags: ['invoice'],
        query: (body) => {
          return {
            url: 'invoice',
            method: 'POST',
            body,
          };
        },
      }),
    };
  },
});

export const { useFetchClientsQuery } = clientApi;
export const { useFetchSenderQuery } = senderApi;
export const { useFetchItemsQuery } = itemsApi;
export const { useFetchInvoiceQuery, useRecordPaymentMutation } = invoiceApi;
export { clientApi, senderApi, itemsApi, invoiceApi };
