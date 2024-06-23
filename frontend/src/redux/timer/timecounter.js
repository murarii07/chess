import { createSlice } from '@reduxjs/toolkit'

export const timeSlice = createSlice({
  name: 'time',
  initialState: {
    value: 10
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    stateChange: (state, action) => {
      state.value = action.payload
    },

  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, stateChange } = timeSlice.actions

export default timeSlice.reducer