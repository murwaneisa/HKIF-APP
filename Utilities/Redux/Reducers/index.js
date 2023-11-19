import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../Slices/userSlice'
import adminReducer from '../Slices/adminSlice'

const rootReducer = combineReducers({
  user: userReducer,
  adminReducer: adminReducer,
  // Add other slices here
})

export default rootReducer
