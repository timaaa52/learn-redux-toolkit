import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"

type TaskStateType = {
    tasks: Array<{
        id: string
        title: string
        status: boolean
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
            state.tasks.unshift({ id: nanoid(), title: action.payload.text, status: false })
        },
        removeTask: (state, action: PayloadAction<{id: string}>) => {
           state.tasks = state.tasks.filter((t) => t.id !== action.payload.id)
        },
        changeTaskStatus: (state, action: PayloadAction<{id: string, status: boolean}>) => {
            state.tasks = state.tasks.map(t => t.id === action.payload.id ? {...t, status: action.payload.status} : t)
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
       console.log(response)
       
       dispatch(TaskAction.addTask({text}))
   }
)
export const removeTaskT = createAsyncThunk(
    'tasks/removeTask', 
    async (id: string, {dispatch}) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        })
        console.log(response);
        
        dispatch(TaskAction.removeTask({id}))
    }
) 
export const TaskReducer = TaskSlice.reducer;
export const TaskAction = TaskSlice.actions;