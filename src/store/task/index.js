import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    tasks: null,
    task: null,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, { payload }) => {
            state.tasks = payload
        },
        setSelectedTask: (state, { payload }) => {
            state.task = payload
        }
    },
    extraReducers: {}
})
export const { setSelectedTask, setTasks } = taskSlice.actions

export default taskSlice.reducer