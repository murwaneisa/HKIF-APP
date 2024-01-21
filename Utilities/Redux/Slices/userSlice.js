import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    logoutUser: state => {
      state.currentUser = null
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer
