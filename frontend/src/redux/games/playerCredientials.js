import { createSlice } from '@reduxjs/toolkit'

export const Credintials = createSlice({
    name: 'opponent',
    initialState: {
        value:'Abc'
    },
    reducers: {
        stateChange: (state, action) => {
            state.value = action.payload
        },

    }
})

// Action creators are generated for each case reducer function
export const { stateChange } = Credintials.actions

export default Credintials.reducer