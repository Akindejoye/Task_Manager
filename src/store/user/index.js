import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    users: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, { payload }) => {
            state.users = payload
        },
        loginUser: (state, { payload }) => {
            localStorage.setItem('user', JSON.stringify(payload))
            state.user = payload
        }
    },
    extraReducers: {}
})

export const { setUsers, loginUser } = userSlice.actions

export default userSlice.reducer