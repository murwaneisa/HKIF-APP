import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../Slices/userSlice'

const rootReducer = combineReducers({
  user: userReducer,
  // Add other slices here
})

export default rootReducer
