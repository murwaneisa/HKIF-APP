import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentAdmin: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.currentAdmin = action.payload
    },
    logoutAdmin: state => {
      state.currentAdmin = null
    },
  },
})

export const { setAdmin, logoutAdmin } = adminSlice.actions
export default adminSlice.reducer
