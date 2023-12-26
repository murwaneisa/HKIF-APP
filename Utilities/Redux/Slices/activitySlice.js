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
  },
})

export const {
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
} = activitySlice.actions
export default activitySlice.reducer
