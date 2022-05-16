import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
    value: number
}

const initialState = { value: 0 } as CounterState

const counterSlice = createSlice({
    name: 'counter', 
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value--
        },
        calcByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})


export const {increment, decrement, calcByAmount} = counterSlice.actions
export default counterSlice.reducer