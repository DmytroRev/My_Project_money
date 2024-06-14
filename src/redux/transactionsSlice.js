import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    list: []
}

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction : (state, action) => {
            state.list.push(action.payload)
        }
    }
})

export const { addTransaction  } = transactionsSlice.actions
export default transactionsSlice.reducer