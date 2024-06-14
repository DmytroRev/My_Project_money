import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: []
}


const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: {
      reducer: (state, action) => {
        state.transactions.unshift(action.payload); // Добавляем новую транзакцию в начало списка
      },
      prepare: ({ amount, date, type, info }) => {
        return {
          payload: {
            amount,
            date, // Добавляем дату в транзакцию
            type,
            info,
          },
        };
      },
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;

export const selectRecentTransactions = (state) =>
  state.transactions.transactions.slice(0, 3); // Выбираем последние три транзакции

export default transactionsSlice.reducer;