import { createSlice } from '@reduxjs/toolkit'

export const timeSlice = createSlice({
  name: 'time',
  initialState: {
    value: 5
  },
  reducers: {
    stateTimeChange: (state, action) => {
      state.value = action.payload
    },

  }
})

// Action creators are generated for each case reducer function
export const {stateTimeChange } = timeSlice.actions

export default timeSlice.reducer