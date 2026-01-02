import { configureStore } from "@reduxjs/toolkit";
import { emptyReducer } from "./emptyReducer";

export const store = configureStore({
    reducer:{ empty: emptyReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

