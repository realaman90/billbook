import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const invoiceFormSlice = createSlice({
  name: 'invoiceForm',
  initialState: {
    details: {
      invoiceNumber: '',
      invoiceName: '',
      invoiceLogo: '',
      invoiceDate: dayjs(Date.now()).format(),
      invoiceDueDate: null,
    },
    client: {
      id: '',
      name: '',
      email: '',
      address: '',
      pinCode: '',
      phone: '',
      businessNumber: '',
      vat: '',
    },
    sender: {
      id: '',
      name: '',
      email: '',
      address: '',
      pinCode: '',
      phone: '',
      businessNumber: '',
      vat: '',
    },
    items: [
      {
        id: 1,
        name: '',
        description: '',
        quantity: 0,
        amount: 0,
        rate: 0,
        discountAmount: 0,
        tax: [],
        discount: 0,
      },
    ],
    subtotal: 0,
    totalTax: 0,
    totalDiscount: 0,
    fee: [],
    total: 0,
    payments: [],
    balanceDue: 0,
    additionalNotes: '',
    attachments: '',
    currency: '₹',
    locale: 'en-IN',
  },
  reducers: {
    updateDetails(state, action) {
      console.log(action.payload);
      state.details = action.payload;
    },
    updateClient(state, action) {
      state.client = action.payload;
    },
    updateSender(state, action) {
      state.sender = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    updateItem(state, action) {
      state.items = action.payload;
      state.subtotal =
        Math.round(
          (state.items
            .map((item) => parseFloat(item.amount))
            .reduce((accum, currVal) => accum + currVal, 0) +
            Number.EPSILON) *
            100
        ) / 100;
      state.totalTax =
        Math.round(
          (state.items
            .map((item) =>
              item.tax
                .map((tax) => parseFloat(tax.amount))
                .reduce((accum, currVal) => accum + currVal, 0)
            )
            .reduce((accum, currVal) => accum + currVal, 0) +
            Number.EPSILON) *
            100
        ) / 100;
      state.totalDiscount =
        Math.round(
          (state.items
            .map((item) => parseFloat(item.discountAmount))
            .reduce((accum, currVal) => accum + currVal, 0) +
            Number.EPSILON) *
            100
        ) / 100;
      const feeArr = state.fee.map((fee) => {
        return fee.amount + fee.tax;
      });

      state.total =
        Math.round(
          (state.subtotal -
            state.totalDiscount +
            state.totalTax +
            feeArr.reduce((a, b) => a + b, 0) +
            Number.EPSILON) *
            100
        ) / 100;
      state.balanceDue =
        state.total -
        state.payments
          .map((payment) => parseFloat(payment.amount))
          .reduce((a, b) => a + b, 0);
    },
    removeItem(state, action) {
      state.items.splice(action.payload, 1);
    },

    addItemTax(state, action) {
      const { index } = action.payload;
      state.items[index].tax = [...state.items[index].tax, action.payload];
    },
    addFee(state, action) {
      state.fee.push(action.payload);
      const feeArr = state.fee.map((fee) => {
        return fee.amount + fee.tax;
      });
      state.total =
        state.total +
        Math.round((feeArr.reduce((a, b) => a + b, 0) + Number.EPSILON) * 100) /
          100;
      state.balanceDue =
        state.total -
        state.payments
          .map((payment) => parseFloat(payment.amount))
          .reduce((a, b) => a + b, 0);
    },
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
    updatePayment(state, action) {
        state.payments = action.payload;
        state.balanceDue =
            state.total -
            state.payments
            .map((payment) => parseFloat(payment.amount))
            .reduce((a, b) => a + b, 0);
        }
  },
});
export const {
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
} = invoiceFormSlice.actions;
export const invoiceFormReducer = invoiceFormSlice.reducer;
