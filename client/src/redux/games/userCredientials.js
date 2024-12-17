import { createSlice } from '@reduxjs/toolkit'

export const userCred = createSlice({
    name: 'user',
    initialState: {
        value:''
    },
    reducers: {
        stateUserChange: (state, action) => {
            state.value = action.payload
        },

    }
})

// Action creators are generated for each case reducer function
export const { stateUserChange } = userCred.actions

export default userCred.reducer