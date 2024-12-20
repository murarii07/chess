import { createSlice } from '@reduxjs/toolkit'

export const gameCredentials= createSlice({
    name: 'gameInfo',
    initialState: {
        user:window.localStorage.getItem("playerName"),
        opponent:'ABC',
        gameId:null,
        color:'white'
    },
    reducers: {
        stateUserChange: (state, action) => {
            state.user = action.payload
        },
        stateOpponentChange: (state, action) => {
            state.opponent = action.payload
        },
        stateGameIdChange: (state, action) => {
            state.gameId = action.payload
        },
        stateColorChange: (state, action) => {
            state.color = action.payload
        },
        stateAllChange:(state,action)=>{
            state={...state,...action.payload}
        }

    }
})

// Action creators are generated for each case reducer function
export const { stateUserChange,stateOpponentChange,stateGameIdChange,stateColorChange,stateAllChange } = gameCredentials.actions

export default gameCredentials.reducer