import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  usersList: [],
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
    setUsers: (state, action) => {
      state.usersList = action.payload
    },
  },
})

export const { setUser, logoutUser, setUsers } = userSlice.actions
export default userSlice.reducer
