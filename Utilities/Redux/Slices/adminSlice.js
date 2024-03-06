import { createSlice } from '@reduxjs/toolkit'
import {
  deleteAdminThunk,
  registerAdminThunk,
  updateAdminThunk,
} from '../../Axios/admin'

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
      // case to update an admin
      .addCase(updateAdminThunk.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          admin => admin._id === action.payload._id
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      // delete case for delete an admin
      .addCase(deleteAdminThunk.fulfilled, (state, action) => {
        state.data = state.data.filter(admin => admin._id !== action.payload)
      })
      // Add cases for register an admin
      .addCase(registerAdminThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(registerAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(registerAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
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
