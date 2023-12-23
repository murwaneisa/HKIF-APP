import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../Slices/userSlice'
import adminReducer from '../Slices/adminSlice'
import activityReducer from '../Slices/activitySlice'

const rootReducer = combineReducers({
  user: userReducer,
  adminReducer: adminReducer,
  activity: activityReducer,
  // Add other slices here
})

export default rootReducer
