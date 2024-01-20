import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const activitySlice = createSlice({
  name: 'activity',
  initialState: initialState,
  reducers: {
    fetchActivitiesRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchActivitiesSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchActivitiesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateActivityFavorite: (state, action) => {
      const { _id, userId } = action.payload
      const index = state.data.findIndex(activity => activity._id === _id)
      if (index !== -1) {
        const activity = state.data[index]
        const isUserFavorite = activity.membersIds.includes(userId)
        if (!isUserFavorite) {
          activity.membersIds.push(userId)
        } else {
          activity.membersIds = activity.membersIds.filter(id => id !== userId)
        }
      }
    },
  },
})

export const {
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  updateActivityFavorite,
} = activitySlice.actions
export default activitySlice.reducer
