import { configureStore } from "@reduxjs/toolkit";
import { 
    updateDetails, 
    updateClient,
    updateSender,
    addItem,
    updateItem,
    removeItem,
    addItemTax,
    invoiceFormReducer, 
} from "./slices/invoiceForm";
import { clientApi, senderApi, itemsApi } from "./apis/invoiceApis";

const store = configureStore({
    reducer:{
        invoiceForm: invoiceFormReducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [senderApi.reducerPath]: senderApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware:(getDefaultMiddleware) =>{
        return getDefaultMiddleware()
                    .concat(clientApi.middleware)
                    .concat(senderApi.middleware)
                    .concat(itemsApi.middleware)
    },
});

export {
    store,
    updateDetails, 
    updateClient,
    updateSender,
    updateItem,
    removeItem,
    addItemTax,
    addItem,

};

export {
    useFetchClientsQuery,
    useFetchSenderQuery,
    useFetchItemsQuery,
} from './apis/invoiceApis';