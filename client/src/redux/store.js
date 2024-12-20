import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './timer/timecounter.js'
import  gameCredReducer  from './games/gameCredientials.js'
import FlagplayReducer from "./games/flag.js"
import statusBoard from "./games/statusBoard.js"
export default configureStore({
  reducer: {
    time: counterReducer,
    gameInfo: gameCredReducer,
    f: FlagplayReducer,
    statusBoard: statusBoard

  }
})