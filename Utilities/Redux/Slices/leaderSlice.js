import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  publicLeadersData: [],
  loading: false,
  error: null,
}

const leaderSlice = createSlice({
  name: 'leader',
  initialState: initialState,
  reducers: {
    fetchActivitiesLeadersRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchActivitiesLeadersSuccess: (state, action) => {
      state.loading = false
      state.publicLeadersData = action.payload
    },
    fetchActivitiesLeadersFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchActivitiesLeadersRequest,
  fetchActivitiesLeadersSuccess,
  fetchActivitiesLeadersFailure,
} = leaderSlice.actions
export default leaderSlice.reducer
