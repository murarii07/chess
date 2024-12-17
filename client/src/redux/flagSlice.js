import { createSlice } from '@reduxjs/toolkit'

export const flagSlice = createSlice({
    name: 'flag',
    initialState: {
        value:"New"
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