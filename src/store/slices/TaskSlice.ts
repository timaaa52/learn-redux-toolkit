import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"

type TaskStateType = {
    tasks: Array<{
        id: string
        title: string
        status: boolean
    }>
}


const initialState: TaskStateType = {
    tasks: []
}

export const TaskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.tasks.unshift({ id: nanoid(), title: action.payload, status: false })
        },
        removeTask: (state, action: PayloadAction<{id: string}>) => {
           state.tasks = state.tasks.filter((t) => t.id !== action.payload.id)
        },
        changeTaskStatus: (state, action: PayloadAction<{id: string, status: boolean}>) => {
            state.tasks = state.tasks.map(t => t.id === action.payload.id ? {...t, status: action.payload.status} : t)
        }
    }
})


export const TaskReducer = TaskSlice.reducer;
export const TaskAction = TaskSlice.actions;