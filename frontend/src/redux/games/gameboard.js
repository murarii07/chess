import { createSlice } from '@reduxjs/toolkit'

export const flagSlice = createSlice({
    name: 'ws',
    initialState: {
        value: new WebSocket("ws://localhost:3000")
    },
    reducers: {
        stateChange: (state, action) => {
            state.value = action.payload
        },

    }
})

// Action creators are generated for each case reducer function
export const { stateChange } = flagSlice.actions

export default flagSlice.reducer