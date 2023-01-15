import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const clientApi = createApi ({
    reducerPath:'clients',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    endpoints(builder) {
        return{
            fetchClients: builder.query({
                query: () => {
                    return {
                        url:'clients',
                        method:'GET'
                    }
                }
            }),
        }
    }
});
const senderApi = createApi ({
    reducerPath:'sender',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    endpoints(builder) {
        return{
            fetchSender: builder.query({
                query: () => {
                    return {
                        url:'sender',
                        method:'GET'
                    }
                }
            }),
        }
    }
});
const itemsApi = createApi({
    reducerPath:'items',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8000/'
    }),
    endpoints(builder) {
        return {
            fetchItems: builder.query({
                query: () => {
                    return {
                        url:'items',
                        method:'GET'
                    }
                }
            }),
        }
    }
});

export const {
    useFetchClientsQuery
} = clientApi;
export const {
    useFetchSenderQuery
} = senderApi;
export const {useFetchItemsQuery} = itemsApi;
export {clientApi,senderApi, itemsApi};
