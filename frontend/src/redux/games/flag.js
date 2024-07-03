import { createSlice } from '@reduxjs/toolkit'

export const Flag = createSlice({
    name: 'flag',
    initialState: {
        value:false,
    },
    reducers: {
        stateFlagChange: (state) => {
            state.value = !state.value
        },

    }
})

// Action creators are generated for each case reducer function
export const { stateFlagChange } = Flag.actions

export default Flag.reducer