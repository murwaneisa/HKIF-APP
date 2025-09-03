import { registerUser } from '../../Axios/auth'

// Action types
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'
export const RESET_REGISTRATION_STATE = 'RESET_REGISTRATION_STATE'

// Action creators
export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST
})

export const registerUserSuccess = (userData) => ({
  type: REGISTER_USER_SUCCESS,
  payload: userData
})

export const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error
})

export const resetRegistrationState = () => ({
  type: RESET_REGISTRATION_STATE
})

// Thunk action for user registration
export const registerUserThunk = (userData) => {
  return async (dispatch) => {
    dispatch(registerUserRequest())
    
    try {
      const result = await registerUser(userData)
      
      if (result.success) {
        dispatch(registerUserSuccess(result.data))
        return result
      } else {
        dispatch(registerUserFailure(result.message || 'Registration failed'))
        return result
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred'
      dispatch(registerUserFailure(errorMessage))
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      }
    }
  }
}
