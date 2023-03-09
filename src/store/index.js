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
    addFee,
    changeCurrency,
    updatePayment,
} from "./slices/invoiceForm";
import { clientApi, senderApi, itemsApi, invoiceApi } from "./apis/invoiceApis";

const store = configureStore({
    reducer:{
        invoiceForm: invoiceFormReducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [senderApi.reducerPath]: senderApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        [invoiceApi.reducerPath]: invoiceApi.reducer,
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
    addFee,
    changeCurrency,
    updatePayment,

};

export {
    useFetchClientsQuery,
    useFetchSenderQuery,
    useFetchItemsQuery,
    useFetchInvoiceQuery,
    useRecordPaymentMutation,

} from './apis/invoiceApis';