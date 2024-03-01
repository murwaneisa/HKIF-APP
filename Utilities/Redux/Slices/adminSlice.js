import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  currentAdmin: null,
  loading: false,
  error: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchAdminRequest: state => {
      state.loading = true
      state.loading = null
    },
    fetchAdminsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchAdminFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setAdmin: (state, action) => {
      state.loading = false
      state.currentAdmin = action.payload
    },
    logoutAdmin: state => {
      state.currentAdmin = null
    },
  },
})

export const {
  fetchAdmin,
  setAdmin,
  logoutAdmin,
  fetchAdminsSuccess,
  fetchAdminRequest,
  fetchAdminFailure,
} = adminSlice.actions
export default adminSlice.reducer
