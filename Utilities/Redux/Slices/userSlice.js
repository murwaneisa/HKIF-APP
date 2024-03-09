import { createSlice } from '@reduxjs/toolkit'
import { deleteUserThunk } from '../Actions/userActions'

const initialState = {
  currentUser: null,
  data: [],
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
      state.data = action.payload
    },
  },
  extraReducers: builder => {
    builder
      // delete case for delete an user
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        console.log('the user id in the slicer', action.payload)
        state.data = state.data.filter(user => user._id !== action.payload)
      })
      .addCase(deleteUserThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setUser, logoutUser, setUsers } = userSlice.actions
export default userSlice.reducer
