import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import { persistStore, persistReducer,  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "TransactionsValue",
    storage,
    whitelist: ["list"]
}

const persistedTransactionsReducer = persistReducer(persistConfig, transactionsReducer)

export const store = configureStore({
    reducer: {
        transactions: persistedTransactionsReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)