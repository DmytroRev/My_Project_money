import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: []
}


const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    addHistoryTransaction: {
      reducer: (state, action) => {
        state.list = [action.payload, ...state.list.slice(0, 2)];
      },
      prepare: (payload) => {
        return {
          payload: {
            ...payload,
            id: new Date().getTime().toString() // генерируем временный id
          }
        };
      }
    }
  }
});

export const { addTransaction, addHistoryTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;

