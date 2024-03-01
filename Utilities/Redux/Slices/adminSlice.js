import { createSlice } from '@reduxjs/toolkit'
import { deleteAdminThunk, updateAdminThunk } from '../../Axios/admin'

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
  extraReducers: builder => {
    builder
      .addCase(updateAdminThunk.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          admin => admin._id === action.payload.id
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(deleteAdminThunk.fulfilled, (state, action) => {
        state.data = state.data.filter(admin => admin !== action.payload)
      })
    // You may also handle pending and rejected states for loading indicators or error messages
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
