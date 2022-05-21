import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import {AppRootStateType} from "../store";

type TaskStateType = {
    tasks: Array<{
        id: number
        title: string
        completed: boolean
        userId: number
    }>
    isLoading: boolean
}


const initialState: TaskStateType = {
    tasks: [],
    isLoading: false,
}

export const TaskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{text: string}>) => {
            state.tasks.unshift({ id: Number(nanoid()), title: action.payload.text, completed: false, userId: Number(nanoid()) })
        },
        removeTask: (state, action: PayloadAction<{id: number}>) => {
           state.tasks = state.tasks.filter((t) => t.id !== action.payload.id)
        },
        changeTaskStatus: (state, action: PayloadAction<{id: number, status: boolean}>) => {
            state.tasks = state.tasks.map(t => t.id === action.payload.id ? {...t, completed: action.payload.status} : t)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchTasks.pending, (state) => {
            state.isLoading = true
        }) 
    }
})

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks', 
    async () => {
        const tasks = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        const response = await tasks.json()
        return response
    }
)
export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
   async (text: string, {dispatch}) => {
       const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
           method: 'POST',
           body: JSON.stringify({
            userId: 1,
            id: 1,
            title: text,
            completed: false
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       })
       dispatch(TaskAction.addTask({text}))
   }
)
export const removeTaskT = createAsyncThunk(
    'tasks/removeTask', 
    async (id: number, {dispatch}) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        })
        dispatch(TaskAction.removeTask({id}))
    }
)

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (value: {id: number, status: boolean}, {dispatch, getState}) => {
        const { tasks } = (getState() as AppRootStateType).tasks
        const currentTask = tasks.find(t => t.id === value.id)
        if(!currentTask){
            console.warn('ERROR')
            return
        }
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${value.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: currentTask.id,
                completed: value.status,
                title: currentTask.title,
                userId: currentTask.userId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch(TaskAction.changeTaskStatus(value))
    }
)

export const TaskReducer = TaskSlice.reducer;
export const TaskAction = TaskSlice.actions;