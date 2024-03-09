import { createSlice } from '@reduxjs/toolkit'

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
})

export const {
  updateStepOneData,
  updateStepTwoData,
  updateStepThreeData,
  updateStepFourData,
  updateStepFiveData,
} = registrationSlice.actions
export default registrationSlice.reducer
