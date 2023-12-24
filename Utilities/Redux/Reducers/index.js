import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../Slices/userSlice'
import adminReducer from '../Slices/adminSlice'
import activityReducer from '../Slices/activitySlice'
import eventReducer from '../Slices/eventSlice'

const rootReducer = combineReducers({
  user: userReducer,
  adminReducer: adminReducer,
  activity: activityReducer,
  event: eventReducer,
  // Add other slices here
})

export default rootReducer
