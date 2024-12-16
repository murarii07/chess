import { createSlice } from '@reduxjs/toolkit'

export const statusBoard = createSlice({
    name: 'statusBoard',
    initialState: {
        value: []
    },
    reducers: {
        stateChange: (state, action) => {
            state.value = action.payload
        },
        updateState: (state, action) => {
            state.value = [...state.value, action.payload]
        }

    }
})

// Action creators are generated for each case reducer function
export const { stateChange,updateState } = statusBoard.actions

export default statusBoard.reducer