import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  publicUsersInfo: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    publicUsersInfo: (state, action) => {
      state.publicUsersInfo = action.payload
    },
  },
})

export const { setUser, publicUsersInfo } = userSlice.actions
export default userSlice.reducer
