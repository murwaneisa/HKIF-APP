import { createSlice } from '@reduxjs/toolkit'
import { 
  REGISTER_USER_REQUEST, 
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_FAILURE,
  RESET_REGISTRATION_STATE 
} from '../Actions/registrationActions'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthDate: '',
  gender: '',
  nationality: '',
  address: '',
  city: '',
  zipCode: '',
  phoneNumber: '',
  role: '',
  // API states
  isLoading: false,
  isSuccess: false,
  error: null,
  userData: null,
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    updateStepOneData: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    updateStepTwoData: (state, action) => {
      state.email = action.payload.email
      state.password = action.payload.password
    },
    updateStepThreeData: (state, action) => {
      state.birthDate = action.payload.birthDate
      state.gender = action.payload.gender
      state.nationality = action.payload.nationality
    },
    updateStepFourData: (state, action) => {
      state.address = action.payload.address
      state.city = action.payload.city
      state.zipCode = action.payload.zipCode
      state.phoneNumber = action.payload.phoneNumber
    },
    updateStepFiveData: (state, action) => {
      state.role = action.payload.role
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REGISTER_USER_REQUEST, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.error = null
      })
      .addCase(REGISTER_USER_SUCCESS, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userData = action.payload
        state.error = null
      })
      .addCase(REGISTER_USER_FAILURE, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.error = action.payload
        state.userData = null
      })
      .addCase(RESET_REGISTRATION_STATE, (state) => {
        return initialState
      })
  },
})

export const {
  updateStepOneData,
  updateStepTwoData,
  updateStepThreeData,
  updateStepFourData,
  updateStepFiveData,
} = registrationSlice.actions
export default registrationSlice.reducer
