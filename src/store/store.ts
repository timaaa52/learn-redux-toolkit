import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./countReducer";



export const store = configureStore({
    reducer: {
        counter: countReducer,
    }
})


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch