import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../Slices/userSlice'
import adminReducer from '../Slices/adminSlice'
import activityReducer from '../Slices/activitySlice'
import eventReducer from '../Slices/eventSlice'
import registrationReducer from '../Slices/registrationSlice'
import leaderReducer from '../Slices/leaderSlice'
import organizationReducer from '../Slices/organizationSlice'

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  activity: activityReducer,
  event: eventReducer,
  registration: registrationReducer,
  leader: leaderReducer,
  organization: organizationReducer,
})

export default rootReducer
