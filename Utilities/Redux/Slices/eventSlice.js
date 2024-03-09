import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  currentEvent: null,
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
    fetchEventByIdSuccess: (state, action) => {
      state.loading = false
      console.log(action.payload._id)
      const index = state.data.findIndex(
        event => event._id === action.payload._id
      )
      if (index !== -1) {
        state.data[index] = action.payload
      } else {
        state.data.push(action.payload)
      }
      state.currentEvent = action.payload
    },
    fetchEventByIdFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addEventSuccess: (state, action) => {
      state.loading = false
      state.data.push(action.payload)
    },
    addEventFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateEventSuccess: (state, action) => {
      state.loading = false
      const index = state.data.findIndex(
        event => event._id === action.payload._id
      )
      if (index !== -1) {
        state.data[index] = action.payload
      }
    },
    updateEventFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteEventSuccess: (state, action) => {
      state.loading = false
      state.data = state.data.filter(event => event._id !== action.payload)
    },
    deleteEventFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
  fetchEventByIdSuccess,
  fetchEventByIdFailure,
  addEventSuccess,
  addEventFailure,
  updateEventSuccess,
  updateEventFailure,
  deleteEventSuccess,
  deleteEventFailure,
} = eventSlice.actions
export default eventSlice.reducer
