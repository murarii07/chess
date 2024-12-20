import { createSlice } from '@reduxjs/toolkit'

export const Flag = createSlice({
    name: 'flag',
    initialState: {
        value:'not_started',
    },
    reducers: {
        stateFlagChange: (state,action) => {
            state.value = action.payload
        },

    }
})

// Action creators are generated for each case reducer function
export const { stateFlagChange } = Flag.actions

export default Flag.reducer