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
  },
})

export const { setAdmin } = adminSlice.actions
export default adminSlice.reducer
