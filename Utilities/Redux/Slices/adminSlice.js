import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adminList: null,
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
    setAdmins: (state, action) => {
      state.adminList = action.payload
    },
  },
})

export const { setAdmin, logoutAdmin, setAdmins } = adminSlice.actions
export default adminSlice.reducer
