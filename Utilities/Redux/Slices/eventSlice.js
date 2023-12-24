import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const eventSlice = createSlice({
  name: 'event',
  initialState: initialState,
  reducers: {
    fetchEventsRequest: state => {
      state.loading = true
      state.error = null
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchEventsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } =
  eventSlice.actions
export default eventSlice.reducer
